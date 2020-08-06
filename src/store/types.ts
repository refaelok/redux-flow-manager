export const INITIAL_STATE = '@@redux-flow-manager/INITIAL_STATE';
export const START_FLOW_TYPE = '@@redux-flow-manager/START_FLOW_TYPE';
export const END_FLOW_TYPE = '@@redux-flow-manager/END_FLOW_TYPE';
export const SET_SUB_FLOW_TYPE = '@@redux-flow-manager/SET_SUB_FLOW_TYPE';
export const ADD_SUB_FLOW_TYPE = '@@redux-flow-manager/ADD_SUB_FLOW_TYPE';
export const REMOVE_SUB_FLOW_TYPE = '@@redux-flow-manager/REMOVE_SUB_FLOW_TYPE';
export const UPDATE_STEPS_INFORMATION = '@@redux-flow-manager/UPDATE_STEPS_INFORMATION';

export interface MultipleFlowManagerState {
	[key: string]: FlowManagerState;
}

export interface FlowManagerState {
	flowType: string;
	subFlowTypes: Array<string>;
	currentStep: string;
	nextStep: string;
	steps: Array<string>;
	isActive: boolean;
}

export interface UpdateStepsInformationInput {
	currentStep?: string;
	nextStep?: string;
	steps?: Array<string>;
}

interface InitialStateTypeAction {
	type: typeof INITIAL_STATE;
	payload: {
		nestedSlice?: string;
	};
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
	payload: {};
}

interface AddSubFlowTypeAction {
	type: typeof ADD_SUB_FLOW_TYPE;
	payload: string;
}

interface SetSubFlowTypeAction {
	type: typeof SET_SUB_FLOW_TYPE;
	payload: Array<string>;
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
	InitialStateTypeAction |
	AddSubFlowTypeAction |
	RemoveSubFlowTypeAction |
	StartFlowTypeAction |
	UpdateStepsInformationAction |
	SetSubFlowTypeAction |
	EndFlowTypeAction;
