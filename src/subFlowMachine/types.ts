export type SubFlowsConfig = Array<SubFlow>;

export interface SubFlowMachineContext {
	currentFlowToCheck: string;
	error: boolean;
}

export interface SubFlow {
	flowName: string;
	conditions: Array<Condition>;
}

export interface Condition {
	conditionName: string;
	onCheck: Function;
	mandatory?: boolean;
}
