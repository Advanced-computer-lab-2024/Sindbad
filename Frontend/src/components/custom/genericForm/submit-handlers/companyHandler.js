import { updateAdvertiser } from "@/services/AdvertiserApiHandler";

export const companySubmit = (values, id, navigate, dispatch) => {
	let companyProfile = {};
	for (const key in values) {
		if (key === "name") {
			companyProfile.name = values[key];
		}
		if (key === "description") {
			companyProfile.description = values[key];
		}
		if (key === "location") {
			companyProfile.location = values[key];
		}
	}
	const body = {
		id: id,
		companyProfile: companyProfile,
	};
	updateAdvertiser(body, id);
};