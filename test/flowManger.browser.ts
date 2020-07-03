import flowManagerAPI from './app';

const startApp = async () => {

	await flowManagerAPI.startFlow('CHQ',true, 'STEP_R');
	await flowManagerAPI.updateInformation();
	const subFlowTypes = flowManagerAPI.getSubFlowTypes();

	await flowManagerAPI.setCurrentStep('STEP_T');
	const nextStep = flowManagerAPI.getNextStep();
	const steps = flowManagerAPI.getSteps();
	const machineConfig = flowManagerAPI.getMachineFlowConfig();

	console.log('subFlowTypes, nextStep, steps', subFlowTypes, nextStep, steps);
	console.log('machine config', machineConfig);

	await flowManagerAPI.setCurrentStep('STEP_R');
	console.log('next step again', flowManagerAPI.getNextStep());


	await flowManagerAPI.updateInformation();

	flowManagerAPI.endFlow();
};

startApp().then(() => {
	console.log('Test Done');
});
