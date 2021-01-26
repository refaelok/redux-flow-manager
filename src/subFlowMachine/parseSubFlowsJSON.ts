export default (subFlowsJson: any, flowsConditions: any) => subFlowsJson.map((subFlow: any) => {
	try {
		const newSubFlow = { ...subFlow };

		newSubFlow.conditions = subFlow?.conditions.map((condition: any) => {
			try {
				const newCondition = { ...condition };
				const onCheck = flowsConditions[condition?.onCheck];

				if (onCheck) newCondition.onCheck = onCheck;
				delete newCondition?.requirePath;

				return newCondition;
			} catch (e) {
				return condition;
			}
		});

		return newSubFlow;
	} catch (e) {
		return subFlow;
	}
});
