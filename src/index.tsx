import { Machine, interpret } from 'xstate';
import { createFlows } from './creators';
import { onFinal } from './actions';
import { flowsConfig } from '../config';

const flows = createFlows(flowsConfig);

if (flowsConfig && flowsConfig.length) {
	const config = {
		id: 'FlowManager',
		initial: `${flowsConfig[0].flowName}Flow`,
		context: { currentFlowState: null },
		states: {
			...flows,
			final: {
				id: 'final',
				type: 'final',
				invoke: {
					id: 'final',
					src: onFinal
				}
			}
		}
	};

	const stateMachine = Machine(config);
	debugger;

	const service = interpret(stateMachine);

	service.start();
}
