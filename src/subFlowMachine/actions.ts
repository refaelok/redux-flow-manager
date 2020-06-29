import { SubFlowMachineContext } from './types';
import StoreAPI from '../store';

export const onCheckStart = (context: SubFlowMachineContext, event: any, flowName: string) => {
	return new Promise((resolve) => {
		context.currentFlowToCheck = `${flowName}Flow`;
		context.error = false;
		return resolve();
	});
};

export const onCheck = (context: SubFlowMachineContext, event: any, onCheckHandler: Function) => {
	return onCheckHandler(context, event);
};

export const onCheckError = (
	context: SubFlowMachineContext, event: any, mandatory?: boolean
) => new Promise((resolve) => {
	if (mandatory !== false) {
		context.error = true;
	}
	return resolve();
});

export const onCheckDone = (context: SubFlowMachineContext, event: any) => {
	return new Promise((resolve) => {
		const { currentFlowToCheck, error } = context;
		const subFlows = StoreAPI.getSubFlows();

		if (currentFlowToCheck) {
			if (error) {
				if (subFlows.includes(currentFlowToCheck)) {
					StoreAPI.removeSubFlow(currentFlowToCheck);
				}
			} else if (!subFlows.includes(currentFlowToCheck)) {
				StoreAPI.addSubFlow(currentFlowToCheck);
			}
		}

		return resolve();
	});
};

export const onFinal = (context: SubFlowMachineContext) => {
	context.currentFlowToCheck = '';
	context.error = false;
};
