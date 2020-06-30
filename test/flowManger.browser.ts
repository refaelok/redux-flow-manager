import flowManagerAPI from './fakeApp';

const startApp = async () => {
	await flowManagerAPI.startFlow('CHQ', 'STEP_R');
	const subFlowTypes = flowManagerAPI.getSubFlowTypes();

	await flowManagerAPI.setCurrentStep('STEP_T');
	const nextStep = flowManagerAPI.getNextStep();
	const steps = flowManagerAPI.getSteps();
	const machineConfig = flowManagerAPI.getMachineFlowConfig();

	console.log('subFlowTypes, nextStep, steps', subFlowTypes, nextStep, steps);
	console.log('machine config', machineConfig);

	await flowManagerAPI.setCurrentStep('STEP_R');
	await flowManagerAPI.nextStep();
	console.log('next step again', flowManagerAPI.getNextStep());
};

startApp().then(() => {
	console.log('Test Done');
});
