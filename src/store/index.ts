import { Store } from 'redux';
import {
	flowTypesSelector,
	subFlowTypesSelector
} from './selectors';
import {
	startFlow,
	endFlow,
	addSubFlowType,
	removeSubFlowType
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

	/* Actions */
	public startFlow(flowType: string, currentStep?: string) {
		this.dispatch(startFlow(flowType, currentStep));
	}

	public endFlow() {
		this.dispatch(endFlow());
	}

	public addSubFlow(subFlowType: string) {
		this.dispatch(addSubFlowType(subFlowType));
	}

	public removeSubFlow(subFlowType: string) {
		this.dispatch(removeSubFlowType(subFlowType));
	}
}

export default new StoreAPI();
