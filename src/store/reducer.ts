import * as _ from 'lodash';

import {
	FlowManagerState,
	FlowManagerActionTypes,
	START_FLOW_TYPE,
	END_FLOW_TYPE,
	SET_SUB_FLOW_TYPE,
	ADD_SUB_FLOW_TYPE,
	REMOVE_SUB_FLOW_TYPE,
	UPDATE_STEPS_INFORMATION
} from './types';

const initialState: FlowManagerState = {
	flowType: '',
	subFlowTypes: [],
	currentStep: '',
	nextStep: '',
	steps: [],
	isActive: false
};

export function flowManagerReducer(
	state = initialState,
	action: FlowManagerActionTypes
): FlowManagerState {
	switch (action.type) {
		case START_FLOW_TYPE: {
			const { flowType, currentStep = '' } = action.payload;
			const newState = { ...state };
			newState.flowType = flowType;
			newState.currentStep = currentStep;
			newState.isActive = true;
			return newState;
		}
		case END_FLOW_TYPE: {
			return { ...initialState, subFlowTypes: [], steps: [], isActive: false };
		}
		case SET_SUB_FLOW_TYPE: {
			const newState = { ...state };
			newState.subFlowTypes = action.payload;
			return newState;
		}
		case ADD_SUB_FLOW_TYPE: {
			const newState = { ...state };
			newState.subFlowTypes = _.union(newState.subFlowTypes, [action.payload]);
			return newState;
		}
		case REMOVE_SUB_FLOW_TYPE: {
			const newState = { ...state };
			newState.subFlowTypes = _.filter(newState.subFlowTypes, (flowType) => action.payload !== flowType);
			return newState;
		}
		case UPDATE_STEPS_INFORMATION: {
			return { ...state, ...action.payload };
		}
		default:
			return state;
	}
}
