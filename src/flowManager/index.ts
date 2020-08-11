import _ from 'lodash';
import StoreAPI from '../store';
import SubFlowMachine from '../subFlowMachine';
import { SubFlowsConfig } from '../subFlowMachine/types';
import { UpdateStepsInformationInput } from '../store/types';

const FINAL_STEP_VALUE = 'FINAL';

export default class FlowManagerAPI {
	private readonly storeApi: StoreAPI;
	private readonly subFlowMachine: SubFlowMachine;
	private readonly stepsConfig: any;
	private unsubscribe: any;

	constructor(flowsConfig: SubFlowsConfig, stepsConfig: any, storeApi: StoreAPI) {
		this.storeApi = storeApi;
		this.subFlowMachine = new SubFlowMachine(flowsConfig, storeApi);
		this.stepsConfig = stepsConfig;

		this.getMachineFlowConfig = this.getMachineFlowConfig.bind(this);
		this.updateInformation = this.updateInformation.bind(this);
		this.nextStep = this.nextStep.bind(this);
		this.isLastStep = this.isLastStep.bind(this);
		this.endFlow = this.endFlow.bind(this);
		this.getFlowType = this.getFlowType.bind(this);
		this.getSubFlowTypes = this.getSubFlowTypes.bind(this);
		this.getCurrentStep = this.getCurrentStep.bind(this);
		this.getSteps = this.getSteps.bind(this);
		this.getNextStep = this.getNextStep.bind(this);
	}

	/* private methods */
	private calculateSubFlowTypes() {
		const flowType = this.storeApi.getFlowType();
		if (!flowType) {
			throw new Error(
				// eslint-disable-next-line max-len
				'You try updateInformation without set flow type. did you forget to call to startFlow in some point ?'
			);
		}

		return new Promise((resolve) => {
			const { service } = this.subFlowMachine;

			service.stop();

			service.start().onDone(() => {
				return resolve(this.storeApi.getSubFlows());
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
			} else {
				result = {
					currentStep: '',
					nextStep: '',
					steps: []
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

	private setCurrentStep(currentStep: string) {
		const flowType = this.storeApi.getFlowType();
		const steps = this.storeApi.getSteps();

		if (!flowType) {
			throw new Error(
				// eslint-disable-next-line max-len
				'You try updateCurrentStep without set flow type. did you forget to call to startFlow in some point ?'
			);
		}

		this.storeApi.updateStepsInformation({
			currentStep,
			nextStep: this.calculateNextStep(steps, currentStep)
		});
	}

	/* public methods */
	public getMachineFlowConfig() {
		return this.subFlowMachine.machineConfig;
	}

	public async startFlow(flowType: string, currentStep: string, autoUpdate?: boolean, debounceTime?: number) {
		this.storeApi.startFlow(flowType, currentStep);

		await this.updateInformation();

		const debounceUpdateInformation = _.debounce(
			this.updateInformation.bind(this),
			debounceTime || 250
		);

		if (autoUpdate) {
			this.unsubscribe = this.storeApi.store.subscribe(() => {
				debounceUpdateInformation();
			});
		}
	}

	public async updateInformation() {
		if (this.storeApi.getIsActive()) {
			const currentStepBeforeCalculate = this.storeApi.getCurrentStep();
			const nextStepBeforeCalculate = this.storeApi.getNextStep();
			const stepsBeforeCalculate = this.storeApi.getSteps();

			await this.calculateSubFlowTypes();
			const result = this.calculateStepInformation();

			if (
				currentStepBeforeCalculate !== result.currentStep
				|| nextStepBeforeCalculate !== result.nextStep
				|| !_.isEqual(stepsBeforeCalculate, result.steps)
			) {
				this.storeApi.updateStepsInformation(result);
			}
		}
	}

	public nextStep(step?: string) {
		if (!step && this.isLastStep()) {
			return FINAL_STEP_VALUE;
		}

		const nextStep = step || this.getNextStep();
		this.setCurrentStep(nextStep);
		return nextStep;
	}

	public isLastStep() {
		const steps = this.getSteps();
		const lastStep = _.last(steps);
		const currentStep = this.getCurrentStep();

		return currentStep === lastStep;
	}

	public endFlow() {
		const { service } = this.subFlowMachine;

		if (this.unsubscribe) {
			this.unsubscribe();
		}

		service.stop();

		this.storeApi.endFlow();
	}

	/* Selectors */
	public getFlowType() {
		return this.storeApi.getFlowType();
	}

	public getSubFlowTypes() {
		return this.storeApi.getSubFlows();
	}

	public getCurrentStep() {
		return this.storeApi.getCurrentStep();
	}

	public getSteps() {
		return this.storeApi.getSteps();
	}

	public getNextStep() {
		return this.storeApi.getNextStep();
	}
}
