import { Store } from 'redux';
import StoreAPI from './store';
import FlowManagerAPI from './flowManager';
import { SubFlowsConfig } from './subFlowMachine/types';

export { default as FlowManagerAPI } from './flowManager';
export * from './store/types';
export { flowManagerReducer } from './store/reducer';
export * from './subFlowMachine/types';
export default (
	store: Store, sliceName: string, flowsConfig: SubFlowsConfig, stepsConfig: any, nestedSlice?: string
) => {
	if (!store || !sliceName || !flowsConfig || !stepsConfig) {
		throw new Error(`store, sliceName, stepsConfig and flowsConfig are mandatory to create FlowManagerAPI. 
			Please check the parameters you sent.`);
	}

	const storeApi = new StoreAPI(store, sliceName, nestedSlice);
	return new FlowManagerAPI(flowsConfig, stepsConfig, storeApi);
};

