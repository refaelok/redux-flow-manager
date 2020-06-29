import { Store } from 'redux';
import { subFlowTypesSelector } from './selectors';
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

	private getFlowManagerState() {
		return this.store.getState()[this.sliceName];
	}

	private dispatch(action: any) {
		this.store.dispatch(action);
	}

	public startFlow(flowType: string, currentPage?: string) {
		this.dispatch(startFlow(flowType, currentPage));
	}

	public endFlow() {
		this.dispatch(endFlow());
	}

	public getSubFlows() {
		return subFlowTypesSelector(this.getFlowManagerState());
	}

	public addSubFlow(subFlowType: string) {
		this.dispatch(addSubFlowType(subFlowType));
	}

	public removeSubFlow(subFlowType: string) {
		this.dispatch(removeSubFlowType(subFlowType));
	}
}

export default new StoreAPI();
