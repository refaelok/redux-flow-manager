import {
	Machine,
	interpret,
	Interpreter,
	AnyEventObject
} from 'xstate';
import StoreAPI from '../store';
import { SubFlowsConfig } from './types';
import CreateMachineConfig from './creators';

class FlowMachineAPI {
	readonly storeApi: StoreAPI;
	readonly service: Interpreter<any, any, AnyEventObject>;
	public machineConfig: any;

	constructor(flowsConfig: SubFlowsConfig, storeApi: StoreAPI) {
		this.storeApi = storeApi;
		this.service = this.initialMachine(flowsConfig);
	}

	initialMachine(flowsConfig: any) {
		const config = new CreateMachineConfig(flowsConfig, this.storeApi);
		const stateMachine = Machine(config.createConfig());

		this.machineConfig = stateMachine.config;
		return interpret(stateMachine);
	}
}

export default FlowMachineAPI;
