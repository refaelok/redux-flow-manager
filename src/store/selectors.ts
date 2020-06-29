import { FlowManagerState } from './types';

export const flowTypesSelector = (state: FlowManagerState) => state.flowType;
export const subFlowTypesSelector = (state: FlowManagerState) => state.subFlowTypes;
export const getCurrentStepSelector = (state: FlowManagerState) => state.currentStep;
