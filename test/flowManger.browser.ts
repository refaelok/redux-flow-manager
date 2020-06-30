import flowManagerAPI from './fakeApp';

const startApp = async () => {
	await flowManagerAPI.startFlow('CHQ', 'STEP_R');
	await flowManagerAPI.updateInformation();
	const subFlowTypes = flowManagerAPI.getSubFlowTypes();

	flowManagerAPI.setCurrentStep('STEP_T');
	const nextStep = flowManagerAPI.getNextStep();
	const steps = flowManagerAPI.getSteps();
	const machineConfig = flowManagerAPI.getMachineFlowConfig();

	console.log('subFlowTypes, nextStep, steps', subFlowTypes, nextStep, steps);
	console.log('machine config', machineConfig);
};

startApp().then(() => {
	console.log('Test Done');
});
