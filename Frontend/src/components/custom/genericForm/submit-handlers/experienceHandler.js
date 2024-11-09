import { updateTourGuide } from "@/services/TourGuideApiHandler";

export const experienceSubmit = (values, id, data, navigate, dispatch) => {
	const previousWork = {};
	for (const key in values) {
		if (key === "jobTitle") {
			previousWork.jobTitle = values[key];
		}
		if (key === "companyName") {
			previousWork.companyName = values[key];
		}
		if (key === "duration") {
			previousWork.duration = values[key];
		}
		if (key === "description") {
			previousWork.description = values[key];
		}
	}

	const body = {
		previousWork: {
			...previousWork,
		},
	};

	if (data) {
		body.previousWork._id = data._id;
	}

	updateTourGuide(id, body);
};