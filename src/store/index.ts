import { Store } from 'redux';
import * as _ from 'lodash';
import { UpdateStepsInformationInput } from './types';
import {
	flowTypesSelector,
	subFlowTypesSelector,
	getCurrentStepSelector,
	getNextStepSelector,
	getStepsSelector,
	getIsActiveSelector
} from './selectors';
import {
	initialState,
	startFlowAction,
	endFlowAction,
	addSubFlowTypeAction,
	removeSubFlowTypeAction,
	updateStepsInformationAction,
	setSubFlowTypesAction
} from './actions';

class StoreAPI {
	public store: Store;
	public sliceName: string;
	public nestedSlice?: string;

	constructor(store: Store, sliceName: string, nestedSlice?: string) {
		this.store = store;
		this.sliceName = sliceName;
		this.nestedSlice = nestedSlice;

		this.dispatch(initialState(this.nestedSlice));
	}

	private dispatch(action: any) {
		const newAction = action;
		if (!newAction.payload) newAction.payload = {};
		newAction.payload.nestedSlice = this.nestedSlice;

		this.store.dispatch(newAction);
	}

	private getFlowManagerState() {
		const pathInStore = this.nestedSlice ? `${this.sliceName}.${this.nestedSlice}` : this.sliceName;
		return _.get(this.store.getState(), pathInStore);
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

	public getNextStep() {
		return getNextStepSelector(this.getFlowManagerState());
	}

	public getSteps() {
		return getStepsSelector(this.getFlowManagerState());
	}

	public getIsActive() {
		return getIsActiveSelector(this.getFlowManagerState());
	}

	/* Actions */
	public startFlow(flowType: string, currentStep?: string) {
		this.dispatch(startFlowAction(flowType, currentStep));
	}

	public endFlow() {
		this.dispatch(endFlowAction());
	}

	public setSubFlowTypes(subFlowTypes: Array<string>) {
		this.dispatch(setSubFlowTypesAction(subFlowTypes));
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

export default StoreAPI;
