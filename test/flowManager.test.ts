import flowManagerAPI from './fakeApp';

test('Start Flow with flowType = CHQ; currentStep = STEP_R', async () => {
	await flowManagerAPI.startFlow('CHQ', 'STEP_R');
	const flowType = flowManagerAPI.getFlowType();
	const currentStep = flowManagerAPI.getCurrentStep();

	expect(flowType).toBe('CHQ');
	expect(currentStep).toBe('STEP_R');
});

test('Calculate sub flow types with sub flows = [planOnlyFlow, changePlanFlow]', async () => {
	await flowManagerAPI.updateInformation();
	const subFlows = flowManagerAPI.getSubFlowTypes();

	expect(subFlows).toMatchObject(['planOnlyFlow', 'changePlanFlow']);
});

test('set current step to STEP_T', async () => {
	flowManagerAPI.setCurrentStep('STEP_T');
	const currentStep = flowManagerAPI.getCurrentStep();

	expect(currentStep).toBe('STEP_T');
});

test('After test set STEP_T next step should be STEP_X', async () => {
	flowManagerAPI.setCurrentStep('STEP_T');
	const nextStep = flowManagerAPI.getNextStep();

	expect(nextStep).toBe('STEP_X');
});

test('after End Flow data should be empty in store', async () => {
	flowManagerAPI.endFlow();
	const flowType = flowManagerAPI.getFlowType();
	const subFlowTypes = flowManagerAPI.getSubFlowTypes();

	expect(flowType).toBe('');
	expect(subFlowTypes).toMatchObject([]);
});
