export default (subFlowsJson: any, flowsConditions: any) => subFlowsJson.map((subFlow: any) => {
	try {
		const newSubFlow = { ...subFlow };

		newSubFlow.conditions = subFlow?.conditions.map((condition: any) => {
			try {
				const newCondition = { ...condition };
				const onCheck = flowsConditions[condition?.onCheck];

				if (!onCheck || typeof onCheck !== 'function') {
					// eslint-disable-next-line max-len
					throw new Error(`Error in parseSubFlowsJSON function - Your onCheck '${condition?.onCheck}' condition is missing in flowsConditions object or is not a function. Please check your flows conditions object you provide to parseSubFlowsJSON`);
				}

				newCondition.onCheck = onCheck;
				delete newCondition?.requirePath;

				return newCondition;
			} catch (e) {
				throw new Error(e);
			}
		});

		return newSubFlow;
	} catch (e) {
		throw new Error(e);
	}
});
