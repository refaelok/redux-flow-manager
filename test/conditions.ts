import { SubFlowMachineContext } from '../src/subFlowMachine/types';

// eslint-disable-next-line max-len
export const conditionExampleTemplate = (isSuccess = false, conditionName: string) => (context: SubFlowMachineContext, event: any) => {
	return new Promise((resolve, reject) => {
		// eslint-disable-next-line max-len
		console.log('Check conditionName:', conditionName, 'flow to check:', context.currentFlowToCheck, 'isSuccess:', isSuccess);

		if (isSuccess) {
			return resolve();
		}

		return reject();
	});
};
