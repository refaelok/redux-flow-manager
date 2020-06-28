import {
	Machine,
	interpret,
	Interpreter,
	AnyEventObject
} from 'xstate';
import { FlowsConfig, MachineContext } from './types';
import { createMachineConfig } from './creators';

class FlowMachineAPI {
	readonly service: Interpreter<MachineContext, any, AnyEventObject>;

	constructor(flowsConfig: FlowsConfig) {
		this.service = this.initialMachine(flowsConfig);
	}

	initialMachine(flowsConfig: FlowsConfig) {
		const config = createMachineConfig(flowsConfig);
		const stateMachine = Machine(config);

		return interpret(stateMachine);
	}
}

export default FlowMachineAPI;
