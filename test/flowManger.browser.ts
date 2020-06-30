import flowManagerAPI from './fakeApp';

const startApp = async () => {
	await flowManagerAPI.startFlow('CHQ', 'STEP_R');
	await flowManagerAPI.updateInformation();
	const subFlowTypes = flowManagerAPI.getSubFlowTypes();

	flowManagerAPI.setCurrentStep('STEP_T');
	const nextStep = flowManagerAPI.getNextStep();
	console.log('subFlowTypes, nextStep', subFlowTypes, nextStep);
};

startApp().then(() => {
	console.log('Test Done');
});
