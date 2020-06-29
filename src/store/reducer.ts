import _ from 'lodash';

import {
	FlowManagerState,
	FlowManagerActionTypes,
	START_FLOW_TYPE,
	END_FLOW_TYPE,
	ADD_SUB_FLOW_TYPE,
	REMOVE_SUB_FLOW_TYPE
} from './types';

const initialState: FlowManagerState = {
	currentPage: '',
	nextPage: '',
	flowType: '',
	subFlowTypes: [],
	pages: []
};

export function flowManagerReducer(
	state = initialState,
	action: FlowManagerActionTypes
): FlowManagerState {
	switch (action.type) {
		case START_FLOW_TYPE: {
			const { flowType, currentPage = '' } = action.payload;
			const newState = { ...state };
			newState.flowType = flowType;
			newState.currentPage = currentPage;
			return newState;
		}
		case END_FLOW_TYPE: {
			return { ...initialState };
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
		default:
			return state;
	}
}
