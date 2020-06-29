import StoreAPI from '../store';
import SubFlowMachine from '../subFlowMachine';
import { SubFlowsConfig } from '../subFlowMachine/types';

export default class FlowManagerAPI {
	private readonly subFlowMachine: SubFlowMachine;

	constructor(flowsConfig: SubFlowsConfig) {
		this.subFlowMachine = new SubFlowMachine(flowsConfig);
	}

	public startFlow(flowType: string, currentPage?: string) {
		const { service } = this.subFlowMachine;

		service.stop();

		StoreAPI.startFlow(flowType, currentPage);

		service.start().onDone(() => {
			// TODO: Calculate pages information
		});
	}

	public endFlow() {
		const { service } = this.subFlowMachine;

		service.stop();
		StoreAPI.endFlow();
	}

	public UpdateCurrentPage(currentPage: string) {
		const { service } = this.subFlowMachine;

		service.stop();

		// TODO: Update current page in store

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
