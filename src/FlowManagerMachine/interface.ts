export type FlowsConfig = Array<Flow>;

export interface MachineContext {
	currentFlowState: null;
	error: boolean;
}

export interface Flow {
	flowName: string;
	conditions: Array<Condition>;
}

export interface Condition {
	conditionName: string;
	onCheck: Function;
}
