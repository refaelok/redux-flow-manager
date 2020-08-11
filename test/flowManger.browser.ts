import createApp from './app';
import FlowManagerAPI from '../src/flowManager';

const {
	flowManagerApi_1,
	flowManagerApi_2
} = createApp(true, false);

const startApp = async (flowManagerApi: FlowManagerAPI) => {

	// Machine 1
	const {
		getFlowType
	} = flowManagerApi;

	await flowManagerApi.startFlow('CHQ', 'STEP_R', true);
	const flowType = getFlowType();
	console.log(flowType);

	await flowManagerApi.updateInformation();
	const subFlowTypes = flowManagerApi.getSubFlowTypes();

	await flowManagerApi.nextStep('STEP_T');
	const nextStep = flowManagerApi.getNextStep();
	const steps = flowManagerApi.getSteps();
	const machineConfig = flowManagerApi.getMachineFlowConfig();

	console.log('subFlowTypes, nextStep, steps', subFlowTypes, nextStep, steps);
	console.log('machine config', machineConfig);

	await flowManagerApi.nextStep('STEP_R');
	console.log('next step again', flowManagerApi.getNextStep());

	await flowManagerApi.updateInformation();

	flowManagerApi.endFlow();
};

startApp(flowManagerApi_1).then(() => {
	console.log('Test Done');
});

startApp(flowManagerApi_2).then(() => {
	console.log('Test Done');
});
