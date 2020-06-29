import StoreAPI from '../store';
import SubFlowMachine from '../subFlowMachine';
import { SubFlowsConfig } from '../subFlowMachine/types';

export default class FlowManagerAPI {
	private readonly subFlowMachine: SubFlowMachine;

	constructor(flowsConfig: SubFlowsConfig) {
		this.subFlowMachine = new SubFlowMachine(flowsConfig);
	}

	public startFlow() {

	}

	public endFlow() {

	}

	public setFlowType(flowType: string) {
		const { service } = this.subFlowMachine;

		service.stop();

		StoreAPI.setFlowType(flowType);

		service.start();
	}

	public calculateSubFlowTypes() {
		return new Promise((resolve) => {
			const { service } = this.subFlowMachine;

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
