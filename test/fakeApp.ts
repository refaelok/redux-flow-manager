import { createStore, combineReducers } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';
import CreateFlowManagerAPI, { flowManagerReducer } from '../src';
import { conditionExampleTemplate } from './conditions';

/** * Conditions Promises ** */
const conditionA = conditionExampleTemplate(true, 'conditionA');
const conditionB = conditionExampleTemplate(false, 'conditionB');
const conditionC = conditionExampleTemplate(false, 'conditionC');
const conditionD = conditionExampleTemplate(true, 'conditionD');

/** * Flows Config ** */
const flowsConfig = [
	{
		flowName: 'onlyAccessoryFlow',
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
		flowName: 'planOnlyFlow',
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
		flowName: 'changePlanFlow',
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

const store = createStore(rootReducer, devToolsEnhancer({}));

export default CreateFlowManagerAPI(store, 'flowManager', flowsConfig);

