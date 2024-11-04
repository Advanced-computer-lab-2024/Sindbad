import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ProfileBanner from "@/components/custom/profile/ProfileBanner";
import Wallet from "@/components/custom/profile/Wallet";
import Experience from "@/components/custom/profile/Experience";
import CompanyProfile from "@/components/custom/profile/CompanyProfile";
import Timeline from "@/components/custom/profile/Timeline";
import TagManagement from "@/components/custom/admin/TagManagement";
import Verify from "@/components/custom/profile/Verify";
import Documents from "@/components/custom/profile/Documents";

import { getTouristById } from "@/services/TouristApiHandler";
import { getTourGuide } from "@/services/TourGuideApiHandler";
import { getSeller, getMyProducts } from "@/services/SellerApiHandler";
import { getAdvertiser } from "@/services/AdvertiserApiHandler";
import { getTourismGovernor } from "@/services/TourismGovernorApiHandler";
import { getMyActivities } from "@/services/ActivityApiHandler";
import { getMyItineraries } from "@/services/ItineraryApiHandler";
import { getMySites } from "@/services/SiteApiHandler";
import { getUserRole } from "@/services/UserApiHandler";

import { useUser } from "@/state management/userInfo";

function Profile() {
	const { profileId } = useParams(); // id of the user whose profile is being viewed
	const { role, id } = useUser(); // details of the logged in user
	const [profileRole, setProfileRole] = useState("guest"); // role of the user whose profile is being viewed
	const [userData, setUserData] = useState(null); // details of the user whose profile is being viewed
	const [cardData, setCardData] = useState([]); // data to be displayed in the timeline (activities, products, itineraries, sites)
	const [error, setError] = useState(false);

	const getUserInfo = async (profileId) => {
		let response;
		const r = await getRole(profileId); // get the role of the user whose profile is being viewed

		if (r === "tourist") {
			if (profileId == id || role === "admin") {
				// nobody can view the profile of a tourist except the tourist himself or an admin
				response = await getTouristById(profileId);
			}
			else {
				response = { error: true, message: "Unauthorized access" };
			}
		}
		else if (r === "tourGuide") {
			response = await getTourGuide(profileId);
		}
		else if (r === "seller") {
			response = await getSeller(profileId);
		}
		else if (r === "advertiser") {
			response = await getAdvertiser(profileId);
		}
		else if (r === "tourismGovernor") {
			response = await getTourismGovernor(profileId);
		}

		if (response.error) {
			setError(true);
			console.error(response.message);
		} else {
			setError(false);
			setUserData(response);
			console.log(response);
		}
	};

	const getRole = async (profileId) => {
		const response = await getUserRole(profileId);
		if (response.error) {
			setError(true);
			console.error(response.message);
		} else {
			setProfileRole(response.role);
			return response.role;
		}
	};

	const getCardData = async (profileId) => {
		let response;
		if (profileRole === "advertiser") {
			response = await getMyActivities(profileId);
			if (response.error) {
				console.error(response.message);
			} else {
				setCardData(response);
			}
		} else if (profileRole === "tourGuide") {
			response = await getMyItineraries(profileId);
			if (response.error) {
				console.error(response.message);
			} else {
				setCardData(response);
			}
		} else if (profileRole === "tourismGovernor") {
			response = await getMySites(profileId);
			if (response.error) {
				console.error(response.message);
			} else {
				setCardData(response);
			}
		} else if (profileRole === "seller") {
			response = await getMyProducts(profileId);
			if (response.error) {
				console.error(response.message);
			} else {
				setCardData(response);
			}
		}
	};

	// get the role of the user whose profile is being viewed
	useEffect(() => {
		if (profileId) {
			getUserInfo(profileId);
		}
	}, [profileId]);

	// get the data to be displayed in the timeline (activities, products, itineraries, sites)
	useEffect(() => {
		if (
			profileId && userData &&
			profileRole !== "guest" &&
			Object.keys(userData).length > 0
		) {
			getCardData(profileId);
		}
	}, [profileRole, userData]);

	if (!userData) {
		return (
			<div className="py-8 px-24 max-w-[1200px] flex gap-9 mx-auto">
				<div className="flex justify-center w-full">
					<p className="text-neutral-400 text-sm italic">
						{error === true ?
							"Profile does not exist or you are not authorised to view it."
							:
							"Loading..."
						}
					</p>
				</div>
			</div>
		);
	}

	if (userData && (userData.isAccepted !== true && role !== "admin") && profileId !== id) {
		return (
			<div className="py-8 px-24 max-w-[1200px] flex gap-9 mx-auto">
				<div className="flex justify-center w-full">
					<p className="text-neutral-400 text-sm italic">
						Profile does not exist or you are not authorised to view it.
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className="py-8 px-24 max-w-[1200px] mx-auto">
			<div className="flex gap-9">
				{profileRole !== "tourismGovernor" && (
					<div className="flex flex-col w-max gap-9 self-start">
						<ProfileBanner
							userData={userData}
							profileId={profileId}
							id={id}
							profileRole={profileRole}
						/>
						{profileRole === "tourist" && profileId === id && (
							<Wallet userData={userData} />
						)}
						{role === "admin" && userData.isAccepted === null &&
							<Verify profileId={profileId} profileRole={profileRole} getUserInfo={getUserInfo} />
						}
					</div>
				)}
				<div className="w-full flex flex-col gap-12">
					{profileRole === "advertiser" && (
						<CompanyProfile
							userData={userData}
							profileId={profileId}
							id={id}
						/>
					)}
					{profileRole === "tourGuide" && (
						<Experience userData={userData} profileId={profileId} id={id} />
					)}
					{(role === "admin" || (id === profileId && userData.isAccepted !== true && userData.isAccepted !== undefined)) &&
						<Documents userData={userData} />
					}
					{!(userData.isAccepted === null && role === "admin") &&
						<Timeline
							userData={userData}
							profileId={profileId}
							id={id}
							profileRole={profileRole}
							cardData={cardData}
							setCardData={setCardData}
						/>
					}
				</div>
			</div>
			{profileRole === "tourismGovernor" && profileId === id && (
				<div className="mt-12">
					<TagManagement />
				</div>
			)}
		</div>
	);
}

export default Profile;
