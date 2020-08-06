import { FlowManagerState } from './types';

export const flowTypesSelector = (state: FlowManagerState) => state.flowType;
export const subFlowTypesSelector = (state: FlowManagerState) => state.subFlowTypes;
export const getCurrentStepSelector = (state: FlowManagerState) => state.currentStep;
export const getNextStepSelector = (state: FlowManagerState) => state.nextStep;
export const getStepsSelector = (state: FlowManagerState) => state.steps;
export const getIsActiveSelector = (state: FlowManagerState) => state.isActive;
