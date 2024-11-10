import { createActivity, updateActivity } from "@/services/ActivityApiHandler";

export const activitySubmit = (values, id, data, navigate, dispatch) => {
	if (data) {
		const activityId = data._id;
		updateActivity(activityId, values);
	} else {
		const activityWithId = {
			...values,
			creatorId: id,
		};
		createActivity(activityWithId);
	}
};