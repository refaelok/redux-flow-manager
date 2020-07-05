import createApp from './app';

const flowManagerAPI = createApp(true);

const startApp = async () => {

	await flowManagerAPI.startFlow('CHQ', 'STEP_R', true);
	await flowManagerAPI.updateInformation();
	const subFlowTypes = flowManagerAPI.getSubFlowTypes();

	await flowManagerAPI.nextStep('STEP_T');
	const nextStep = flowManagerAPI.getNextStep();
	const steps = flowManagerAPI.getSteps();
	const machineConfig = flowManagerAPI.getMachineFlowConfig();

	console.log('subFlowTypes, nextStep, steps', subFlowTypes, nextStep, steps);
	console.log('machine config', machineConfig);

	await flowManagerAPI.nextStep('STEP_R');
	console.log('next step again', flowManagerAPI.getNextStep());

	await flowManagerAPI.updateInformation();

	flowManagerAPI.endFlow();
};

startApp().then(() => {
	console.log('Test Done');
});
