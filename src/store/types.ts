export const START_FLOW_TYPE = '@@redux-flow-manager/START_FLOW_TYPE';
export const END_FLOW_TYPE = '@@redux-flow-manager/END_FLOW_TYPE';
export const ADD_SUB_FLOW_TYPE = '@@redux-flow-manager/ADD_SUB_FLOW_TYPE';
export const REMOVE_SUB_FLOW_TYPE = '@@redux-flow-manager/REMOVE_SUB_FLOW_TYPE';

export interface FlowManagerState {
	flowType: string;
	subFlowTypes: Array<string>;
	currentPage: string;
	nextPage: string;
	pages: Array<string>;
}

interface StartFlowTypeAction {
	type: typeof START_FLOW_TYPE;
	payload: {
		flowType: string;
		currentPage?: string;
	};
}

interface EndFlowTypeAction {
	type: typeof END_FLOW_TYPE;
}

interface AddSubFlowTypeAction {
	type: typeof ADD_SUB_FLOW_TYPE;
	payload: string;
}

interface RemoveSubFlowTypeAction {
	type: typeof REMOVE_SUB_FLOW_TYPE;
	payload: string;
}

export type FlowManagerActionTypes =
	AddSubFlowTypeAction |
	RemoveSubFlowTypeAction |
	StartFlowTypeAction |
	EndFlowTypeAction;
