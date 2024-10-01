import React, { useEffect } from 'react';
import ProfileBanner from "@/components/custom/profile/ProfileBanner";
import Wallet from "@/components/custom/profile/Wallet";
import Experience from "@/components/custom/profile/Experience";
import Itineraries from "@/components/custom/timelines/Itineraries";
import { useDispatch } from 'react-redux';
import { login, useUser } from '@/state management/userInfo';

function Profile() {
    const dispatch = useDispatch();
    const { type, id } = useUser();

    function constUserData() {
        return {
            type: "tourist",
            id: 1000
        };
    }

    useEffect(() => {
        const getUserData = async () => {
            const userData = constUserData(); // replace with api call later

            if (userData) {
                dispatch(login({ type: userData.type, id: userData.id }));
            }
        };

        getUserData();
    }, [dispatch]);

    useEffect(() => {
        console.log(`Type: ${type}, ID: ${id}`);
    }, [type, id]);

    return (
        <div className="py-16 px-24 max-w-[1200px] flex gap-9 mx-auto">
            <div className="flex flex-col w-max gap-9 self-start">
                <ProfileBanner />
                <Wallet />
            </div>
            <div className="w-full flex flex-col gap-12">
                <Experience />
                <Itineraries />
            </div>
        </div>
    );
}

export default Profile;