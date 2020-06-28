import { createStore, combineReducers } from 'redux';
import CreateFlowManagerAPI, { flowManagerReducer } from '../src';

/** * Conditions ** */
const conditionA = (context: any, event: any) => {
	return new Promise((resolve) => {
		console.log('invoke condition A in ', context.currentFlowToCheck);
		return resolve();
	});
};
const conditionB = (context: any, event: any) => {
	return new Promise((resolve, reject) => {
		console.log('invoke condition B in ', context.currentFlowToCheck);
		return reject();
	});
};
const conditionC = (context: any, event: any) => {
	return new Promise((resolve, reject) => {
		console.log('invoke condition C in', context.currentFlowToCheck);
		return reject();
	});
};
const conditionD = (context: any, event: any) => {
	return new Promise((resolve) => {
		console.log('invoke condition D in', context.currentFlowToCheck);
		return resolve();
	});
};

/** * Flows Config ** */
const flowsConfig = [
	{
		flowName: 'onlyAccessory',
		conditions: [
			{
				conditionName: 'conditionA',
				onCheck: conditionA
			},
			{
				conditionName: 'conditionB',
				onCheck: conditionB,
				mandatory: false
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

/** * Create Store ** */

const rootReducer = combineReducers({
	flowManager: flowManagerReducer
});

// eslint-disable-next-line no-underscore-dangle
const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

/** * Create and test Flow Manager API ** */
const flowManagerAPI = CreateFlowManagerAPI(store, 'flowManager', flowsConfig);

// Test - Update store only if there is changes
console.log('Test - Update store only if there is changes before: ', flowManagerAPI.getSubFlows());
for (let i = 0; i < 10; i += 1) {
	setTimeout(() => {
		flowManagerAPI.calculateSubFlowTypes().then((subFlows) => {
			console.log('Calculate ', i, flowManagerAPI.getSubFlows());
		});
	}, 0);
}
