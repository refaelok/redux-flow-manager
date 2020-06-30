import _ from 'lodash';
import StoreAPI from '../store';
import SubFlowMachine from '../subFlowMachine';
import { SubFlowsConfig } from '../subFlowMachine/types';
import { UpdateStepsInformationInput } from '../store/types';

export default class FlowManagerAPI {
	private readonly subFlowMachine: SubFlowMachine;
	private readonly stepsConfig: any;

	constructor(flowsConfig: SubFlowsConfig, stepsConfig: any) {
		this.subFlowMachine = new SubFlowMachine(flowsConfig);
		this.stepsConfig = stepsConfig;
	}

	/* private methods */
	private calculateSubFlowTypes() {
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

	private calculateStepInformation(): UpdateStepsInformationInput {
		const flowType = this.getFlowType();
		const subFlowTypes = this.getSubFlowTypes();
		const stepConfigByFlowType = this.stepsConfig[flowType];
		let result = {};

		if (stepConfigByFlowType) {
			const subFlowsSteps = Object.keys(stepConfigByFlowType);

			const subFlowConfigKey = subFlowsSteps.find((subFlow) => {
				const subFlowArray = subFlow.split(',');

				return _.difference(subFlowArray, subFlowTypes).length === 0;
			});

			if (subFlowConfigKey && stepConfigByFlowType[subFlowConfigKey]) {
				const { steps } = stepConfigByFlowType[subFlowConfigKey];
				const currentStep = this.getCurrentStep();
				const nextStep = this.calculateNextStep(steps, currentStep);

				result = {
					currentStep,
					nextStep,
					steps
				};
			}
		}

		return result;
	}

	private calculateNextStep(steps: Array<string>, currentStep: string) {
		const indexOfCurrentStep = steps.indexOf(currentStep);

		if (indexOfCurrentStep > -1 && steps[indexOfCurrentStep + 1]) {
			return steps[indexOfCurrentStep + 1];
		}

		return '';
	}

	/* public methods */
	public getMachineFlowConfig() {
		return this.subFlowMachine.machineConfig;
	}

	public async startFlow(flowType: string, currentStep?: string) {
		StoreAPI.startFlow(flowType, currentStep);

		await this.updateInformation();
	}

	public async updateInformation() {
		const currentStepBeforeCalculate = StoreAPI.getCurrentStep();
		const nextStepBeforeCalculate = StoreAPI.getNextStep();
		const stepsBeforeCalculate = StoreAPI.getSteps();

		await this.calculateSubFlowTypes();
		const result = this.calculateStepInformation();

		if (
			currentStepBeforeCalculate !== result.currentStep
			|| nextStepBeforeCalculate !== result.nextStep
			|| !_.isEqual(stepsBeforeCalculate.sort(), result.steps?.sort())
		) {
			StoreAPI.updateStepsInformation(result);
		}
	}

	public async setCurrentStep(currentStep: string) {
		const flowType = StoreAPI.getFlowType();
		const steps = StoreAPI.getSteps();

		if (!flowType) {
			throw new Error(
				// eslint-disable-next-line max-len
				'You try updateCurrentStep without set flow type. did you forget to call to startFlow in some point ?'
			);
		}
		if (currentStep !== '' && !steps.includes(currentStep)) {
			throw new Error(
				// eslint-disable-next-line max-len
				'You try setCurrentStep with value that not exist in the current steps.'
			);
		}

		StoreAPI.updateStepsInformation({
			currentStep,
			nextStep: this.calculateNextStep(steps, currentStep)
		});

		await this.updateInformation();
	}

	public async nextStep() {
		const nextStep = this.getNextStep();
		await this.setCurrentStep(nextStep);
		return nextStep;
	}

	public endFlow() {
		const { service } = this.subFlowMachine;

		service.stop();

		StoreAPI.endFlow();
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

	public getSteps() {
		return StoreAPI.getSteps();
	}

	public getNextStep() {
		return StoreAPI.getNextStep();
	}
}
