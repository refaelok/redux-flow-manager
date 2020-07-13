import * as _ from 'lodash';
import { SubFlowMachineContext } from './types';
import StoreAPI from '../store';

export const onCheckStart = (
	context: SubFlowMachineContext, event: any, flowName: string, runInFlowTypes?: Array<string>
) => {
	return new Promise((resolve, reject) => {
		const subFlows = StoreAPI.getSubFlows() || [];
		const flowType = StoreAPI.getFlowType();

		context.currentFlowToCheck = flowName;
		context.subFlowTypes = subFlows;
		context.error = false;

		// check if this machine should run by the flow type condition
		if (runInFlowTypes && !runInFlowTypes.includes(flowType)) {
			context.error = true;
			return reject();
		}

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
		const { currentFlowToCheck, error, subFlowTypes } = context;

		if (currentFlowToCheck) {
			if (error) {
				_.pull(subFlowTypes, currentFlowToCheck);
			} else if (!subFlowTypes.includes(currentFlowToCheck)) {
				subFlowTypes.push(currentFlowToCheck);
			}
		}

		return resolve();
	});
};

export const onFinal = (context: SubFlowMachineContext) => {
	const storeSubFlowTypes = StoreAPI.getSubFlows();
	const flowType = StoreAPI.getFlowType();
	const { subFlowTypes } = context;

	if (!_.isEqual(storeSubFlowTypes, subFlowTypes) && flowType) {
		StoreAPI.setSubFlowTypes(context.subFlowTypes);
	}

	context.currentFlowToCheck = '';
	context.error = false;
};
