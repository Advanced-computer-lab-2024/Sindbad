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
import { getUserRole } from '@/services/UserApiHandler';

function Profile() {
    const [userData, setUserData] = useState({});
    const { type, id } = useUser();
    const { userId } = useParams();

    const getUserInfo = async (userId) => {
        let response;
        const role = await getRole(userId);

        if (role === "tourist")
            response = await getTourist(userId);
        else if (role === "tourGuide")
            response = await getTourGuide(userId);
        else if (role === "seller")
            response = await getSeller(userId);
        else if (role === "advertiser")
            response = await getAdvertiser(userId);

        if (response.error) {
            console.error(response.message);
        } else {
            setUserData(response);
        }
    };

    const getRole = async (userId) => {
        const response = await getUserRole(userId);
        if (response.error) {
            console.error(response.message);
        } else {
            console.log(response);
        }
    }

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
