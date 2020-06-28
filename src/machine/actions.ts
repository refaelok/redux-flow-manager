import { MachineContext } from './types';
import StoreAPI from '../store';

export const onCheckStart = (context: MachineContext, event: any, flowName: string) => {
	return new Promise((resolve) => {
		context.currentFlowToCheck = `${flowName}Flow`;
		context.error = false;
		return resolve();
	});
};

export const onCheck = (context: MachineContext, event: any, onCheckHandler: Function) => {
	return onCheckHandler(context, event);
};

export const onCheckError = (context: MachineContext, event: any, mandatory?: boolean) => new Promise((resolve) => {
	if (mandatory !== false) {
		context.error = true;
	}
	return resolve();
});

export const onCheckDone = (context: MachineContext, event: any) => {
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

export const onFinal = (context: MachineContext) => {
	context.currentFlowToCheck = '';
	context.error = false;
};
