import * as _ from 'lodash';

import {
	FlowManagerState,
	MultipleFlowManagerState,
	FlowManagerActionTypes,
	START_FLOW_TYPE,
	END_FLOW_TYPE,
	SET_SUB_FLOW_TYPE,
	ADD_SUB_FLOW_TYPE,
	REMOVE_SUB_FLOW_TYPE,
	UPDATE_STEPS_INFORMATION,
	INITIAL_STATE
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
	state: FlowManagerState | MultipleFlowManagerState = {},
	action: FlowManagerActionTypes | { payload: any; type: any }
): FlowManagerState | MultipleFlowManagerState {
	const { nestedSlice } = action.payload || {};

	switch (action.type) {
		case INITIAL_STATE: {
			const newState = { ...state };

			if (nestedSlice) {
				newState[nestedSlice] = { ...initialState };
				newState[nestedSlice].subFlowTypes = [];
				return newState;
			}

			return initialState;
		}
		case START_FLOW_TYPE: {
			const { flowType, currentStep = '' } = action.payload;
			const newState = { ...state };

			if (nestedSlice) {
				newState[nestedSlice].flowType = flowType;
				newState[nestedSlice].currentStep = currentStep;
				newState[nestedSlice].isActive = true;

				return newState;
			}

			newState.flowType = flowType;
			newState.currentStep = currentStep;
			newState.isActive = true;

			return newState;
		}
		case END_FLOW_TYPE: {
			const newState = { ...state };

			if (nestedSlice) {
				newState[nestedSlice] = {
					...initialState, subFlowTypes: [], steps: [], isActive: false
				};

				return newState;
			}

			return {
				...initialState, subFlowTypes: [], steps: [], isActive: false
			};
		}
		case SET_SUB_FLOW_TYPE: {
			const newState = { ...state };

			if (nestedSlice) {
				newState[nestedSlice].subFlowTypes = action.payload;
				return newState;
			}

			newState.subFlowTypes = action.payload;
			return newState;
		}
		case ADD_SUB_FLOW_TYPE: {
			const newState = { ...state };
			if (nestedSlice) {
				newState[nestedSlice].subFlowTypes = _.union(newState[nestedSlice].subFlowTypes, [action.payload]);
				return newState;
			}

			newState.subFlowTypes = _.union((newState as FlowManagerState).subFlowTypes, [action.payload]);
			return newState;
		}
		case REMOVE_SUB_FLOW_TYPE: {
			const newState = { ...state };

			if (nestedSlice) {
				// eslint-disable-next-line max-len
				newState[nestedSlice].subFlowTypes = _.filter(newState[nestedSlice].subFlowTypes, (flowType) => action.payload !== flowType);
				return newState;
			}

			newState.subFlowTypes = _.filter(newState.subFlowTypes, (flowType) => action.payload !== flowType);
			return newState;
		}
		case UPDATE_STEPS_INFORMATION: {
			const newState = { ...state };

			if (nestedSlice) {
				newState[nestedSlice] = { ...newState[nestedSlice], ...action.payload };
				return newState;
			}

			return { ...state, ...action.payload };
		}
		default:
			return state;
	}
}
