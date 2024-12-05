import { updateAdvertiser } from '@/services/AdvertiserApiHandler';
import { setCurrency } from "@/state management/userInfo";

export const advertiserSubmit = (values, id, navigate, dispatch, currency) => {
	dispatch(setCurrency(values.preferredCurrency));

	const formData = new FormData();
	formData.append("email", values.email);
	formData.append("websiteLink", values.websiteLink);
	formData.append("hotline", values.hotline);
	formData.append("preferredCurrency", values.preferredCurrency);

	if (values.profileImageUri && values.profileImageUri.length > 0) {
		formData.append("profileImageUri", values.profileImageUri[0]);
	}

	if (values.bannerImageUri && values.bannerImageUri.length > 0) {
		formData.append("bannerImageUri", values.bannerImageUri[0]);
	}

	for (let pair of formData.entries()) {
		console.log(pair[0] + ": ", pair[1]);
	}

	return updateAdvertiser(formData, id);
};