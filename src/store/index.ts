import { Store } from 'redux';
import { UpdateStepsInformationInput } from './types';
import {
	flowTypesSelector,
	getCurrentStepSelector,
	subFlowTypesSelector,
	getStepsSelector
} from './selectors';
import {
	startFlowAction,
	endFlowAction,
	addSubFlowTypeAction,
	removeSubFlowTypeAction,
	updateStepsInformationAction
} from './actions';

class StoreAPI {
	private store: Store;
	private sliceName: string;

	public setStore(store: Store, sliceName: string) {
		this.store = store;
		this.sliceName = sliceName;
	}

	private dispatch(action: any) {
		this.store.dispatch(action);
	}

	private getFlowManagerState() {
		return this.store.getState()[this.sliceName];
	}

	/* Selectors */
	public getFlowType() {
		return flowTypesSelector(this.getFlowManagerState());
	}

	public getSubFlows() {
		return subFlowTypesSelector(this.getFlowManagerState());
	}

	public getCurrentStep() {
		return getCurrentStepSelector(this.getFlowManagerState());
	}

	public getSteps() {
		return getStepsSelector(this.getFlowManagerState());
	}

	/* Actions */
	public startFlow(flowType: string, currentStep?: string) {
		this.dispatch(startFlowAction(flowType, currentStep));
	}

	public endFlow() {
		this.dispatch(endFlowAction());
	}

	public addSubFlow(subFlowType: string) {
		this.dispatch(addSubFlowTypeAction(subFlowType));
	}

	public removeSubFlow(subFlowType: string) {
		this.dispatch(removeSubFlowTypeAction(subFlowType));
	}

	public updateStepsInformation(steps: UpdateStepsInformationInput) {
		this.dispatch(updateStepsInformationAction(steps));
	}
}

export default new StoreAPI();
