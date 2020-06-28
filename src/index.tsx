import FlowMachine from './FlowManagerMachine';
import { flowsConfig } from '../config';

const flowMachine = new FlowMachine(flowsConfig);

if (flowMachine.service) {
	flowMachine.service.start();
}
