import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProfileBanner from "@/components/custom/profile/ProfileBanner";
import Experience from "@/components/custom/profile/Experience";
import CompanyProfile from "@/components/custom/profile/CompanyProfile";
import Wallet from "@/components/custom/profile/Wallet";
import Timeline from "@/components/custom/profile/Timeline";
import { useUser } from '@/state management/userInfo';
import { getTourist } from "@/services/TouristApiHandler";
import { getTourGuide } from "@/services/TourGuideApiHandler";
import { getSeller } from "@/services/SellerApiHandler";
import { getAdvertiser } from "@/services/AdvertiserApiHandler";
import { getTourismGovernor } from "@/services/AdminApiHandler";
import { getUserRole } from '@/services/UserApiHandler';
import { getMyActivities } from "@/services/ActivityApiHandler";
import { getMyItineraries } from "@/services/ItineraryApiHandler";
import { getMySites } from "@/services/SiteApiHandler";

function Profile() {
    const [userData, setUserData] = useState({});
    const [cardData, setCardData] = useState([]);
    const { type, id } = useUser();
    const { userId } = useParams();
    const [userType, setUserType] = useState("guest");
    const [error, setError] = useState(false);

    const getUserInfo = async (userId) => {
        let response;
        const t = await getType(userId);

        if (t === "tourist") {
            if (userId == id || type === "admin")
                response = await getTourist(userId);
            else
                response = { error: true, message: "Unauthorized access" };
        }
        else if (t === "tourGuide")
            response = await getTourGuide(userId);
        else if (t === "seller")
            response = await getSeller(userId);
        else if (t === "advertiser")
            response = await getAdvertiser(userId);
        else if (t === "tourismGovernor")
            response = await getTourismGovernor(userId);

        if (response.error) {
            setError(true);
            console.error(response.message);
        } else {
            setError(false);
            setUserData(response);
        }
    };

    const getType = async (userId) => {
        const response = await getUserRole(userId);
        if (response.error) {
            setError(true);
            console.error(response.message);
        } else {
            setUserType(response.role);
            return response.role;
        }
    }

    const getCardData = async (userId) => {
        console.log("userType:", userType, "userData:", userData);
        let response;
        if (userType === "advertiser" && userData?.createdActivities && userData?.createdActivities.length !== 0) {
            response = await getMyActivities(userId);
            if (response.error) {
                console.error(response.message);
            } else {
                setCardData(response);
            }
        }
        else if (userType === "tourGuide") {
            response = await getMyItineraries(userId);
            if (response.error) {
                console.error(response.message);
            } else {
                setCardData(response);
            }
        }
        else if (userType === "tourismGovernor") {
            console.log("Getting sites");
            response = await getMySites(userId);
            if (response.error) {
                console.log("FAIL");
                console.error(response.message);
            } else {
                console.log("SUCCESS");
                setCardData(response);
            }
        }
    };

    useEffect(() => {
        if (userId) {
            getUserInfo(userId);
        }
    }, [userId]);

    useEffect(() => {
        if (userId && userType !== "guest" && Object.keys(userData).length > 0) {
            getCardData(userId);
        }
    }, [userType, userData]);

    return (
        <div className="py-8 px-24 max-w-[1200px] flex gap-9 mx-auto">
            {error === false ?
                <>
                    {userType !== "tourismGovernor" &&
                        <div className="flex flex-col w-max gap-9 self-start">
                            <ProfileBanner userData={userData} userId={userId} id={id} userType={userType} />
                            {userType === "tourist" && userId === id && <Wallet userData={userData} />}
                        </div>
                    }
                    <div className="w-full flex flex-col gap-12">
                        {userType === "advertiser" && <CompanyProfile userData={userData} userId={userId} id={id} />}
                        {userType === "tourGuide" && <Experience userData={userData} userId={userId} id={id} />}
                        <Timeline userData={userData} userId={userId} id={id} userType={userType} cardData={cardData} />
                    </div>
                </>
                :
                <div className="flex justify-center w-full">
                    <p className="text-neutral-400 text-sm italic">Profile does not exist or you are not authorised to view it.</p>
                </div>
            }
        </div>
    );
}

export default Profile;
