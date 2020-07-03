import createApp from './app';

const flowManagerAPI = createApp();

test('startFlow(\'CHQ\', true, \'STEP_R\') - Should be flowType = CHQ; currentStep = STEP_R', async () => {
	await flowManagerAPI.startFlow('CHQ', true, 'STEP_R');
	await flowManagerAPI.updateInformation();
	const flowType = flowManagerAPI.getFlowType();
	const currentStep = flowManagerAPI.getCurrentStep();

	expect(flowType).toBe('CHQ');
	expect(currentStep).toBe('STEP_R');
});

test('updateInformation() - Should be sub flows = [changePlanFlow, planOnlyFlow]', async () => {
	await flowManagerAPI.updateInformation();
	const subFlows = flowManagerAPI.getSubFlowTypes();

	expect(subFlows).toMatchObject(['changePlanFlow', 'planOnlyFlow']);
});

test('setCurrentStep(\'STEP_T\') - Should be STEP_T', async () => {
	await flowManagerAPI.nextStep('STEP_T');
	const currentStep = flowManagerAPI.getCurrentStep();

	expect(currentStep).toBe('STEP_T');
});

test('getNextStep() - Next step should be STEP_X', async () => {
	await flowManagerAPI.nextStep('STEP_T');
	const nextStep = flowManagerAPI.getNextStep();

	expect(nextStep).toBe('STEP_X');
});

test('nextStep() - Move from STEP_T to STEP_X', async () => {
	await flowManagerAPI.nextStep('STEP_T');
	const nextStep = await flowManagerAPI.nextStep();

	expect(nextStep).toBe('STEP_X');
});

test('isLastStep() - Should be true with current step STEP_X', async () => {
	await flowManagerAPI.nextStep('STEP_X');
	const isLastStep = await flowManagerAPI.isLastStep();

	expect(isLastStep).toBeTruthy();
});

test('endFlow() - After End Flow data should be empty in store', () => {
	flowManagerAPI.endFlow();
	const flowType = flowManagerAPI.getFlowType();
	const subFlowTypes = flowManagerAPI.getSubFlowTypes();

	expect(flowType).toBe('');
	expect(subFlowTypes).toMatchObject([]);
});
