import { Condition, SubFlowsConfig, SubFlowMachineContext } from './types';
import Actions from './actions';
import StoreAPI from '../store';

export default class CreateMachineConfig {
	private readonly storeApi: StoreAPI;
	private actions: Actions;
	private readonly flowsConfig: SubFlowsConfig;

	constructor(flowsConfig: SubFlowsConfig, storeApi: StoreAPI) {
		this.storeApi = storeApi;
		this.actions = new Actions(this.storeApi);
		this.flowsConfig = flowsConfig;
	}

	createConfig() {
		const flows = this.createFlows();

		return {
			id: 'FlowManager',
			initial: this.flowsConfig[0].flowName,
			context: {
				runInFlowTypes: this.flowsConfig[0].runInFlowTypes,
				currentFlowToCheck: '',
				error: false
			},
			states: {
				...flows,
				final: {
					id: 'final',
					type: 'final',
					invoke: {
						id: 'final',
						src: (context: SubFlowMachineContext) => this.actions.onFinal(context)
					}
				}
			}
		};
	}

	createFlows() {
		const { flowsConfig } = this;
		const flows = flowsConfig.map((flow, index) => {
			let nextFlowName;

			if (flowsConfig[index + 1]) {
				nextFlowName = flowsConfig[index + 1].flowName;
			}

			if (!flow.conditions?.length) {
				throw new Error(`The sub flow ${flow.flowName} must include at least one condition.`);
			}

			return this.createFlow(flow.flowName, flow.conditions, nextFlowName, flow.runInFlowTypes);
		});

		return Object.assign({}, ...flows);
	}

	createFlow(flowName: string, conditions: Array<Condition>, nextFlowName?: string, runInFlowTypes?: Array<string>) {
		const states = this.createConditions(conditions);

		return {
			[flowName]: {
				id: flowName,
				initial: 'checkStart',
				states: {
					checkStart: {
						invoke: {
							id: flowName,
							src: (context: SubFlowMachineContext, event: any) => {
								return this.actions.onCheckStart(context, event, flowName, runInFlowTypes);
							},
							onDone: 'checkFlow',
							onError: 'checkDone'
						}
					},
					checkFlow: {
						type: 'parallel',
						onDone: 'checkDone',
						states: { ...states }
					},
					checkDone: {
						type: 'final',
						invoke: {
							id: `${flowName}Done`,
							src: (context: any, event: any) => this.actions.onCheckDone(context, event),
							onDone: nextFlowName ? `#${nextFlowName}` : '#final'
						}
					},
				}
			}
		};
	}

	createConditions(conditions: Array<Condition>) {
		const createdConditions = conditions.map((condition) => {
			const { conditionName, onCheck: onCheckCallback, mandatory } = condition;
			return this.createCondition(conditionName, onCheckCallback, mandatory);
		});

		return Object.assign({}, ...createdConditions);
	}

	createCondition(conditionName: string, onCheckHandler: Function, mandatory?: boolean) {
		return {
			[conditionName]: {
				id: conditionName,
				initial: 'check',
				states: {
					check: {
						invoke: {
							id: conditionName,
							src: (
								context: SubFlowMachineContext, event: any
							) => this.actions.onCheck(context, event, onCheckHandler),
							onDone: 'done',
							onError: 'error'
						},
					},
					error: {
						invoke: {
							id: 'error',
							src: (
								context: SubFlowMachineContext, event: any
							) => this.actions.onCheckError(context, event, mandatory),
							onDone: 'done'
						}
					},
					done: {
						type: 'final'
					}
				}
			}
		};
	}
}
