import StoreAPI from '../store';
import SubFlowMachine from '../subFlowMachine';
import { SubFlowsConfig } from '../subFlowMachine/types';

export default class FlowManagerAPI {
	private readonly subFlowMachine: SubFlowMachine;

	constructor(flowsConfig: SubFlowsConfig) {
		this.subFlowMachine = new SubFlowMachine(flowsConfig);
	}

	public startFlow(flowType: string, currentStep?: string) {
		const { service } = this.subFlowMachine;

		service.stop();

		StoreAPI.startFlow(flowType, currentStep);

		service.start().onDone(() => {
			// TODO: Calculate steps information
		});
	}

	public endFlow() {
		const { service } = this.subFlowMachine;

		service.stop();
		StoreAPI.endFlow();
	}

	public updateCurrentStep(currentStep: string) {
		const { service } = this.subFlowMachine;

		service.stop();

		// TODO: Update current steps in store

		service.start();
	}

	public getNextStep() {
		// TODO: Get Next Step
	}

	public calculateSubFlowTypes() {
		const flowType = StoreAPI.getFlowType();
		if (!flowType) {
			throw new Error(
				// eslint-disable-next-line max-len
				'You try calculateSubFlowTypes without set flow type. did you forget to call to startFlow in some point ?'
			);
		}

		return new Promise((resolve) => {
			const { service } = this.subFlowMachine;

			service.stop();

			service.start().onDone(() => {
				return resolve(StoreAPI.getSubFlows());
			});
		});
	}

	/* Selectors */
	public getFlowType() {
		return StoreAPI.getFlowType();
	}

	public getSubFlowTypes() {
		return StoreAPI.getSubFlows();
	}

	public getCurrentStep() {
		return StoreAPI.getCurrentStep();
	}
}
