export const onCheckStart = (context: any, event: any, flowName: string) => {
	return new Promise((resolve) => {
		context.currentFlowState = `${flowName}Flow`;
		context.error = false;
		return resolve();
	});
};

export const onCheck = (context: any, event: any, onCheckHandler: Function) => {
	return onCheckHandler(context, event);
};

export const onCheckError = (context: any) => new Promise((resolve) => {
	context.error = true;
	return resolve();
});

export const onCheckDone = (context: any) => {
	return new Promise((resolve) => {
		console.log('Check Flow Done for flow: ', context.currentFlowState, ' with Error: ', context.error);
		return resolve();
	});
};

export const onFinal = (context: any) => {
	context.currentFlowState = null;
	context.error = false;
};
