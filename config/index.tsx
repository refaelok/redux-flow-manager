// Actions
const conditionA = (context: any, event: any) => {
	return new Promise((resolve) => {
		console.log('invoke condition A in ', context.currentFlowState);
		return resolve();
	});
};
const conditionB = (context: any, event: any) => {
	return new Promise((resolve, reject) => {
		console.log('invoke condition B in ', context.currentFlowState);
		return reject();
	});
};
const conditionC = (context: any, event: any) => {
	return new Promise((resolve) => {
		console.log('invoke condition C in', context.currentFlowState);
		return resolve();
	});
};
const conditionD = (context: any, event: any) => {
	return new Promise((resolve) => {
		console.log('invoke condition D in', context.currentFlowState);
		return resolve();
	});
};

export const flowsConfig = [
	{
		flowName: 'onlyAccessory',
		conditions: [
			{
				conditionName: 'conditionA',
				onCheck: conditionA
			},
			{
				conditionName: 'conditionB',
				onCheck: conditionB
			}
		]
	},
	{
		flowName: 'planOnly',
		conditions: [
			{
				conditionName: 'conditionC',
				onCheck: conditionC
			},
			{
				conditionName: 'conditionD',
				onCheck: conditionD
			}
		]
	},
	{
		flowName: 'changePlan',
		conditions: [
			{
				conditionName: 'conditionA',
				onCheck: conditionA
			},
			{
				conditionName: 'conditionD',
				onCheck: conditionD
			}
		]
	}
];
