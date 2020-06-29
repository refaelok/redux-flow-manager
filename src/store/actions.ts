import {
	START_FLOW_TYPE,
	END_FLOW_TYPE,
	ADD_SUB_FLOW_TYPE,
	REMOVE_SUB_FLOW_TYPE,
	FlowManagerActionTypes
} from './types';

export function startFlow(flowType: string, currentPage?: string): FlowManagerActionTypes {
	return {
		type: START_FLOW_TYPE,
		payload: {
			flowType,
			currentPage
		}
	};
}

export function endFlow(): FlowManagerActionTypes {
	return {
		type: END_FLOW_TYPE
	};
}

export function addSubFlowType(subFlowType: string): FlowManagerActionTypes {
	return {
		type: ADD_SUB_FLOW_TYPE,
		payload: subFlowType
	};
}

export function removeSubFlowType(subFlowType: string): FlowManagerActionTypes {
	return {
		type: REMOVE_SUB_FLOW_TYPE,
		payload: subFlowType
	};
}
