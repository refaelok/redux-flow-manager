export const onCheckStart = (context: any, event: any, flowName: string) => {
	return new Promise((resolve) => {
		context.currentFlowState = `${flowName}Flow`;
		return resolve();
	});
};

export const onCheck = (context: any, event: any, onCheckHandler: Function) => {
	return onCheckHandler(context, event);
};

export const onCheckDone = (context: any, event: any) => {
	return new Promise((resolve) => {
		return resolve();
	});
};

export const onCheckError = (context: any, event: any) => new Promise((resolve) => {
	console.log('Remove Flow Type from Store ', context.currentFlowState);
	return resolve();
});

export const onFinal = (context: any) => {
	context.currentFlowState = null;
};
