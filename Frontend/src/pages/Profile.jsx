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

function Profile() {
    const [userData, setUserData] = useState({});
    const { type, id, username } = useUser();
    const { userId } = useParams();

    const getUserInfo = async (userId) => {
        let response;
        if (type === "tourist")
            response = await getTourist(userId);
        else if (type === "tourGuide")
            response = await getTourGuide(userId);
        else if (type === "seller")
            response = await getSeller(userId);
        else if (type === "advertiser")
            response = await getAdvertiser(username, type);

        if (response.error) {
            console.error(response.message);
        } else {
            setUserData(response);
        }
    };

    useEffect(() => {
        if (userId) {
            getUserInfo(userId);
        }
    }, [userId]);
    useEffect(() => {
        console.log(userData)
    }, [userData]);

    return (
        <div className="py-8 px-24 max-w-[1200px] flex gap-9 mx-auto">
            <div className="flex flex-col w-max gap-9 self-start">
                <ProfileBanner userData={userData} userId={userId} id={id} />
                {type === "tourist" && userId === id && <Wallet userData={userData} />}
            </div>
            <div className="w-full flex flex-col gap-12">
                {type === "advertiser" && <CompanyProfile userData={userData} userId={userId} id={id} />}
                {type === "tourGuide" && <Experience userData={userData} userId={userId} id={id} />}
                <Timeline userData={userData} userId={userId} id={id} />
            </div>
        </div>
    );
}

export default Profile;
