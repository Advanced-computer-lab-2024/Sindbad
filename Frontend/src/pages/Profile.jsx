import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProfileBanner from "@/components/custom/profile/ProfileBanner";
import Experience from "@/components/custom/profile/Experience";
import Wallet from "@/components/custom/profile/Wallet";
import Itineraries from "@/components/custom/timelines/Itineraries";
import { useUser } from '@/state management/userInfo';
import { getTourist, getTourGuide } from "@/services/ApiHandler";

function Profile() {
    const [userData, setUserData] = useState({});
    const { type, id } = useUser();
    const { userId } = useParams();

    const getUserInfo = async (userId) => {
        let response;
        if (type === "tourist")
            response = await getTourist(userId);
        else if (type === "tourGuide")
            response = await getTourGuide(userId);

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
        <div className="py-16 px-24 max-w-[1200px] flex gap-9 mx-auto">
            <div className="flex flex-col w-max gap-9 self-start">
                <ProfileBanner userData={userData} userId={userId} id={id} />
                {type === "tourist" && userId === id && <Wallet userData={userData} />}
            </div>
            <div className="w-full flex flex-col gap-12">
                {type === "tourGuide" && <Experience userData={userData} userId={userId} id={id} />}
                <Itineraries userData={userData} userId={userId} id={id} />
            </div>
        </div>
    );
}

export default Profile;
