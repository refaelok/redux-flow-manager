import flowManagerAPI from './fakeApp';

test('Start Flow with flowType = COP; currentStep = DEVICE_GALLERY', () => {
	flowManagerAPI.startFlow('COP', 'DEVICE_GALLERY');
	const flowType = flowManagerAPI.getFlowType();
	const currentStep = flowManagerAPI.getCurrentStep();

	expect(flowType).toBe('COP');
	expect(currentStep).toBe('DEVICE_GALLERY');
});

test('Calculate sub flow types with sub flows = [onlyAccessory, planOnly]', async () => {
	const subFlows = await flowManagerAPI.calculateSubFlowTypes();
	const subFlowTypesFromAPI = flowManagerAPI.getSubFlowTypes();

	expect(subFlows).toMatchObject(['onlyAccessoryFlow', 'changePlanFlow']);
	expect(subFlowTypesFromAPI).toMatchObject(['onlyAccessoryFlow', 'changePlanFlow']);
});

test('after End Flow data should be empty in store', async () => {
	flowManagerAPI.endFlow();
	const flowType = flowManagerAPI.getFlowType();
	const subFlowTypes = flowManagerAPI.getSubFlowTypes();

	expect(flowType).toBe('');
	expect(subFlowTypes).toMatchObject([]);
});
