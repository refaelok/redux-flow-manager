export const START_FLOW_TYPE = '@@redux-flow-manager/START_FLOW_TYPE';
export const END_FLOW_TYPE = '@@redux-flow-manager/END_FLOW_TYPE';
export const ADD_SUB_FLOW_TYPE = '@@redux-flow-manager/ADD_SUB_FLOW_TYPE';
export const REMOVE_SUB_FLOW_TYPE = '@@redux-flow-manager/REMOVE_SUB_FLOW_TYPE';
export const UPDATE_STEPS_INFORMATION = '@@redux-flow-manager/UPDATE_STEPS_INFORMATION';

export interface FlowManagerState {
	flowType: string;
	subFlowTypes: Array<string>;
	currentStep: string;
	nextStep: string;
	steps: Array<string>;
}

export interface UpdateStepsInformationInput {
	currentStep?: string;
	nextStep?: string;
	steps?: Array<string>;
}

interface StartFlowTypeAction {
	type: typeof START_FLOW_TYPE;
	payload: {
		flowType: string;
		currentStep?: string;
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

interface UpdateStepsInformationAction {
	type: typeof UPDATE_STEPS_INFORMATION;
	payload: {
		steps?: Array<string>;
		currentStep?: string;
		nextStep?: string;
	};
}

export type FlowManagerActionTypes =
	AddSubFlowTypeAction |
	RemoveSubFlowTypeAction |
	StartFlowTypeAction |
	UpdateStepsInformationAction |
	EndFlowTypeAction;
