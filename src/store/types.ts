export const ADD_SUB_FLOW_TYPE = '@flowManager/ADD_SUB_FLOW_TYPE';
export const REMOVE_SUB_FLOW_TYPE = '@flowManager/REMOVE_SUB_FLOW_TYPE';

export interface FlowManagerState {
	currentPage: string;
	nextPage: string;
	flowType: string;
	subFlowTypes: Array<string>;
	pages: Array<string>;
}

interface AddSubFlowTypeAction {
	type: typeof ADD_SUB_FLOW_TYPE;
	payload: string;
}

interface RemoveSubFlowTypeAction {
	type: typeof REMOVE_SUB_FLOW_TYPE;
	payload: string;
}

export type FlowManagerActionTypes = AddSubFlowTypeAction | RemoveSubFlowTypeAction;
