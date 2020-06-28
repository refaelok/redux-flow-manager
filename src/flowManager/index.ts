import StoreAPI from '../store';
import FlowMachine from '../machine';
import { FlowsConfig } from '../machine/types';

export default class FlowManagerAPI {
	private readonly flowMachine: FlowMachine;

	constructor(flowsConfig: FlowsConfig) {
		this.flowMachine = new FlowMachine(flowsConfig);
	}

	public calculateSubFlowTypes() {
		return new Promise((resolve) => {
			const { service } = this.flowMachine;

			service.stop();
			service.start().onDone(() => {
				return resolve(StoreAPI.getSubFlows());
			});
		});
	}

	public getSubFlows() {
		return StoreAPI.getSubFlows();
	}
}
