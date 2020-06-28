import { Store } from 'redux';
import StoreAPI from './store';
import FlowManagerAPI from './flowManager';
import { FlowsConfig } from './machine/types';

export { flowManagerReducer } from './store/reducer';
export default (store: Store, sliceName: string, flowsConfig: FlowsConfig) => {
	if (!store || !sliceName || !flowsConfig) {
		throw new Error(`store, sliceName and flowsConfig are mandatory to create FlowManagerAPI. 
			Please check the parameters you sent.`);
	}

	StoreAPI.setStore(store, sliceName);
	return new FlowManagerAPI(flowsConfig);
};

