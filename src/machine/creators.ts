import { Condition, FlowsConfig, MachineContext } from './types';
import {
	onCheck,
	onCheckStart,
	onCheckDone,
	onCheckError,
	onFinal,
} from './actions';

export const createCondition = (conditionName: string, onCheckHandler: Function, mandatory?: boolean) => {
	return {
		[conditionName]: {
			id: conditionName,
			initial: 'check',
			states: {
				check: {
					invoke: {
						id: conditionName,
						src: (context: MachineContext, event: any) => onCheck(context, event, onCheckHandler),
						onDone: 'done',
						onError: 'error'
					},
				},
				error: {
					invoke: {
						id: 'error',
						src: (context: MachineContext, event: any) => onCheckError(context, event, mandatory),
						onDone: 'done'
					}
				},
				done: {
					type: 'final'
				}
			}
		}
	};
};

export const createConditions = (conditions: Array<Condition>) => {
	const createdConditions = conditions.map((condition) => {
		const { conditionName, onCheck: onCheckCallback, mandatory } = condition;
		return createCondition(conditionName, onCheckCallback, mandatory);
	});

	return Object.assign({}, ...createdConditions);
};

export const createFlow = (flowName: string, conditions: Array<Condition>, nextFlowName?: string) => {
	const states = createConditions(conditions);

	return {
		[`${flowName}Flow`]: {
			id: `${flowName}Flow`,
			initial: 'checkStart',
			states: {
				checkStart: {
					invoke: {
						id: `${flowName}Start`,
						src: (context: MachineContext, event: any) => onCheckStart(context, event, flowName),
						onDone: 'checkFlow'
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
						src: (context: any, event: any) => onCheckDone(context, event),
						onDone: nextFlowName ? `#${nextFlowName}Flow` : '#final'
					}
				},
			}
		}
	};
};

export const createFlows = (flowsConfig: FlowsConfig) => {
	const flows = flowsConfig.map((flow, index) => {
		let nextFlowName;

		if (flowsConfig[index + 1]) {
			nextFlowName = flowsConfig[index + 1].flowName;
		}

		return createFlow(flow.flowName, flow.conditions, nextFlowName);
	});

	return Object.assign({}, ...flows);
};

export const createMachineConfig = (flowsConfig: FlowsConfig) => {
	const flows = createFlows(flowsConfig);

	return {
		id: 'FlowManager',
		initial: `${flowsConfig[0].flowName}Flow`,
		context: {
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
					src: onFinal
				}
			}
		}
	};
};
