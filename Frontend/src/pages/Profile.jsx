import { useEffect, useState } from 'react';
import ProfileBanner from "@/components/custom/profile/ProfileBanner";
import Wallet from "@/components/custom/profile/Wallet";
import Experience from "@/components/custom/profile/Experience";
import Itineraries from "@/components/custom/timelines/Itineraries";
import { useUser } from '@/state management/userInfo';
import { getTourist } from "@/services/ApiHandler";

function Profile() {
    const [userData, setUserData] = useState({});
    const { type, id } = useUser();

    const getUserInfo = async (id) => {
        const response = await getTourist(id);

        if (response.error) {
            console.error(response.message);
        } else {
            setUserData(response);
        }
    }

    useEffect(() => {
        getUserInfo(id);
        console.log(userData);
    }, [id]);

    return (
        <div className="py-16 px-24 max-w-[1200px] flex gap-9 mx-auto">
            <div className="flex flex-col w-max gap-9 self-start">
                <ProfileBanner userData={userData} />
                {type === "tourist" && <Wallet userData={userData} />}
            </div>
            <div className="w-full flex flex-col gap-12">
                {/* <Experience /> */}
                <Itineraries userData={userData} />
            </div>
        </div>
    );
}

export default Profile;