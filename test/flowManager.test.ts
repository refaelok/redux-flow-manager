import flowManagerAPI from './app';

test('Start Flow with flowType = CHQ; currentStep = STEP_R', async () => {
	await flowManagerAPI.startFlow('CHQ', true, 'STEP_R');
	await flowManagerAPI.updateInformation();
	const flowType = flowManagerAPI.getFlowType();
	const currentStep = flowManagerAPI.getCurrentStep();

	expect(flowType).toBe('CHQ');
	expect(currentStep).toBe('STEP_R');
});

test('Calculate sub flow types with sub flows = [changePlanFlow, planOnlyFlow]', async () => {
	await flowManagerAPI.updateInformation();
	const subFlows = flowManagerAPI.getSubFlowTypes();

	expect(subFlows).toMatchObject(['changePlanFlow', 'planOnlyFlow']);
});

test('set current step to STEP_T', async () => {
	flowManagerAPI.setCurrentStep('STEP_T');
	const currentStep = flowManagerAPI.getCurrentStep();

	expect(currentStep).toBe('STEP_T');
});

test('After test set STEP_T next step should be STEP_X', () => {
	flowManagerAPI.setCurrentStep('STEP_T');
	const nextStep = flowManagerAPI.getNextStep();

	expect(nextStep).toBe('STEP_X');
});

test('nextStep() - Move from STEP_T to STEP_X', async () => {
	flowManagerAPI.setCurrentStep('STEP_T');
	const nextStep = await flowManagerAPI.nextStep();

	expect(nextStep).toBe('STEP_X');
});

test('after End Flow data should be empty in store', () => {
	flowManagerAPI.endFlow();
	const flowType = flowManagerAPI.getFlowType();
	const subFlowTypes = flowManagerAPI.getSubFlowTypes();

	expect(flowType).toBe('');
	expect(subFlowTypes).toMatchObject([]);
});
