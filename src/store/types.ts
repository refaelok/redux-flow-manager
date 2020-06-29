export const ADD_FLOW_TYPE = '@@redux-flow-manager/ADD_FLOW_TYPE';
export const ADD_SUB_FLOW_TYPE = '@@redux-flow-manager/ADD_SUB_FLOW_TYPE';
export const REMOVE_SUB_FLOW_TYPE = '@@redux-flow-manager/REMOVE_SUB_FLOW_TYPE';

export interface FlowManagerState {
	currentPage: string;
	nextPage: string;
	flowType: string;
	subFlowTypes: Array<string>;
	pages: Array<string>;
}

interface AddFlowTypeAction {
	type: typeof ADD_FLOW_TYPE;
	payload: string;
}

interface AddSubFlowTypeAction {
	type: typeof ADD_SUB_FLOW_TYPE;
	payload: string;
}

interface RemoveSubFlowTypeAction {
	type: typeof REMOVE_SUB_FLOW_TYPE;
	payload: string;
}

export type FlowManagerActionTypes = AddSubFlowTypeAction | RemoveSubFlowTypeAction | AddFlowTypeAction;
