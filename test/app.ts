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
		flowName: 'planOnlyFlow',
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
		flowName: 'onlyAccessoryFlow',
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

const stepsConfig = {
	COP: {
		onlyAccessoryFlow: {
			steps: [
				'STEP_A',
				'STEP_B',
				'STEP_C',
			]
		}
	},
	CHQ: {
		'planOnlyFlow,changePlanFlow': {
			steps: [
				'STEP_R',
				'STEP_T',
				'STEP_X',
			]
		},
		planOnlyFlow: {
			steps: [
				'STEP_B',
				'STEP_C',
				'STEP_D',
			]
		},
		changePlanFlow: {
			steps: [
				'STEP_A',
				'STEP_D',
				'STEP_E',
			]
		}
	}
};

/** * Create Store ** */
const rootReducer = combineReducers({
	flowManager: flowManagerReducer
});

const store = createStore(rootReducer, devToolsEnhancer({}));

export default CreateFlowManagerAPI(store, 'flowManager', flowsConfig, stepsConfig);

