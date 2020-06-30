import {
	Machine,
	interpret,
	Interpreter,
	AnyEventObject
} from 'xstate';
import { SubFlowsConfig, SubFlowMachineContext } from './types';
import { createMachineConfig } from './creators';

class FlowMachineAPI {
	readonly service: Interpreter<SubFlowMachineContext, any, AnyEventObject>;
	public machineConfig: any;

	constructor(flowsConfig: SubFlowsConfig) {
		this.service = this.initialMachine(flowsConfig);
	}

	initialMachine(flowsConfig: any) {
		const config = createMachineConfig(flowsConfig);
		const stateMachine = Machine(config);

		this.machineConfig = stateMachine.config;
		return interpret(stateMachine);
	}
}

export default FlowMachineAPI;
