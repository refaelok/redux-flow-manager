import { Store } from 'redux';
import StoreAPI from './store';
import FlowManagerAPI from './flowManager';
import { SubFlowsConfig } from './subFlowMachine/types';

export { flowManagerReducer } from './store/reducer';
export * from './subFlowMachine/types';
export default (store: Store, sliceName: string, flowsConfig: SubFlowsConfig, stepsConfig: any) => {
	if (!store || !sliceName || !flowsConfig || !stepsConfig) {
		throw new Error(`store, sliceName, stepsConfig and flowsConfig are mandatory to create FlowManagerAPI. 
			Please check the parameters you sent.`);
	}

	StoreAPI.setStore(store, sliceName);
	return new FlowManagerAPI(flowsConfig, stepsConfig);
};

