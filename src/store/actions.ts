import {
	START_FLOW_TYPE,
	END_FLOW_TYPE,
	SET_SUB_FLOW_TYPE,
	ADD_SUB_FLOW_TYPE,
	REMOVE_SUB_FLOW_TYPE,
	UPDATE_STEPS_INFORMATION,
	FlowManagerActionTypes,
	UpdateStepsInformationInput
} from './types';

export function startFlowAction(flowType: string, currentStep?: string): FlowManagerActionTypes {
	return {
		type: START_FLOW_TYPE,
		payload: {
			flowType,
			currentStep
		}
	};
}

export function endFlowAction(): FlowManagerActionTypes {
	return {
		type: END_FLOW_TYPE
	};
}

export function addSubFlowTypeAction(subFlowType: string): FlowManagerActionTypes {
	return {
		type: ADD_SUB_FLOW_TYPE,
		payload: subFlowType
	};
}

export function removeSubFlowTypeAction(subFlowType: string): FlowManagerActionTypes {
	return {
		type: REMOVE_SUB_FLOW_TYPE,
		payload: subFlowType
	};
}

export function updateStepsInformationAction(stepsInformation: UpdateStepsInformationInput): FlowManagerActionTypes {
	return {
		type: UPDATE_STEPS_INFORMATION,
		payload: stepsInformation
	};
}
export function setSubFlowTypesAction(subFlowTypes: Array<string>): FlowManagerActionTypes {
	return {
		type: SET_SUB_FLOW_TYPE,
		payload: subFlowTypes
	};
}
