import {
	onCheck,
	onCheckStart,
	onCheckDone,
	onCheckError
} from './actions';

interface Flow {
	flowName: string;
	conditions: Array<Condition>;
}

interface Condition {
	conditionName: string;
	onCheck: Function;
}

export const createCondition = (conditionName: string, onCheckHandler: Function) => {
	return {
		[conditionName]: {
			id: conditionName,
			initial: 'check',
			states: {
				check: {
					invoke: {
						id: conditionName,
						src: (context: any, event: any) => onCheck(context, event, onCheckHandler),
						onDone: 'done',
						onError: 'error'
					},
				},
				error: {
					invoke: {
						id: 'error',
						src: (context: any, event: any) => onCheckError(context, event),
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
		return createCondition(condition.conditionName, condition.onCheck);
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
						src: (context: any, event: any) => onCheckStart(context, event, flowName),
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

export const createFlows = (flowsConfig: Array<Flow>) => {
	const flows = flowsConfig.map((flow, index) => {
		let nextFlowName;

		if (flowsConfig[index + 1]) {
			nextFlowName = flowsConfig[index + 1].flowName;
		}

		return createFlow(flow.flowName, flow.conditions, nextFlowName);
	});

	return Object.assign({}, ...flows);
};
