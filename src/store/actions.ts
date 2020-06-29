import {
	ADD_FLOW_TYPE,
	ADD_SUB_FLOW_TYPE,
	REMOVE_SUB_FLOW_TYPE,
	FlowManagerActionTypes
} from './types';

export function addFlowType(subFlowType: string): FlowManagerActionTypes {
	return {
		type: ADD_FLOW_TYPE,
		payload: subFlowType
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
