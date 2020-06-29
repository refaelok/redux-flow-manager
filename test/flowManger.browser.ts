import flowManagerAPI from './fakeApp';

const startApp = async () => {
	flowManagerAPI.startFlow('CHQ', 'DEVICE_LIST');
	const subFlowTypes = await flowManagerAPI.calculateSubFlowTypes();
	console.log(subFlowTypes);
};

startApp().then(() => {
	console.log('Test Done');
});
