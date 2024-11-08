import { createSite, updateSite } from "@/services/SiteApiHandler";

export const siteSubmit = (values, id, data, navigate) => {
	if (data) {
		updateSite(data._id, values);
	} else {
		const siteWithId = {
			...values,
			creatorId: id,
		};
		createSite(siteWithId);
	}
};