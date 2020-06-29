import { Store } from 'redux';
import StoreAPI from './store';
import FlowManagerAPI from './flowManager';
import { SubFlowsConfig } from './subFlowMachine/types';

export { flowManagerReducer } from './store/reducer';
export default (store: Store, sliceName: string, flowsConfig: SubFlowsConfig) => {
	if (!store || !sliceName || !flowsConfig) {
		throw new Error(`store, sliceName and flowsConfig are mandatory to create FlowManagerAPI. 
			Please check the parameters you sent.`);
	}

	StoreAPI.setStore(store, sliceName);
	return new FlowManagerAPI(flowsConfig);
};

