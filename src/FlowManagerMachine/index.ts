import {
	Machine,
	interpret,
	Interpreter,
	AnyEventObject
} from 'xstate';
import { FlowsConfig, MachineContext } from './interface';
import { createMachineConfig } from './creators';

class FlowMachine {
	readonly service: Interpreter<MachineContext, any, AnyEventObject> | null;

	constructor(flowsConfig: FlowsConfig) {
		this.service = this.initialMachine(flowsConfig);
	}

	initialMachine(flowsConfig: FlowsConfig) {
		let service = null;

		if (flowsConfig && flowsConfig.length) {
			const config = createMachineConfig(flowsConfig);
			const stateMachine = Machine(config);

			service = interpret(stateMachine);
		}

		return service;
	}
}

export default FlowMachine;
