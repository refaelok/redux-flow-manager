import * as _ from 'lodash';
import { SubFlowMachineContext } from './types';
import StoreAPI from '../store';

export default class Actions {
	private storeApi: StoreAPI;

	constructor(storeApi: StoreAPI) {
		this.storeApi = storeApi;
	}

	onCheckStart(context: SubFlowMachineContext, event: any, flowName: string, runInFlowTypes?: Array<string>) {
		return new Promise((resolve, reject) => {
			const subFlows = this.storeApi.getSubFlows() || [];
			const flowType = this.storeApi.getFlowType();

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
	}

	onFinal(context: SubFlowMachineContext) {
		const storeSubFlowTypes = this.storeApi.getSubFlows();
		const flowType = this.storeApi.getFlowType();
		const { subFlowTypes } = context;

		if (!_.isEqual(storeSubFlowTypes, subFlowTypes) && flowType) {
			this.storeApi.setSubFlowTypes(context.subFlowTypes);
		}

		context.currentFlowToCheck = '';
		context.error = false;
	}

	onCheckDone(context: SubFlowMachineContext, event: any) {
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
	}

	onCheckError(context: SubFlowMachineContext, event: any, mandatory?: boolean) {
		return new Promise((resolve) => {
			if (mandatory !== false) {
				context.error = true;
			}
			return resolve();
		});
	}

	onCheck(context: SubFlowMachineContext, event: any, onCheckHandler: Function) {
		const state = this.storeApi.store.getState();
		return onCheckHandler(state, context, event);
	}
}
