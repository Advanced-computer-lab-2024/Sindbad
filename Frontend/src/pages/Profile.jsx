import ProfileBanner from "@/components/custom/profile/ProfileBanner";
import Wallet from "@/components/custom/profile/Wallet";
import Experience from "@/components/custom/profile/Experience";
import Itineraries from "@/components/custom/timelines/Itineraries";

function Profile() {
    return (
        <div className="py-20 px-24 max-w-[1500px] flex gap-12 mx-auto">
            <div className="flex flex-col w-max gap-12 self-start">
                <ProfileBanner />
                <Wallet />
            </div>
            <div className="w-full flex flex-col gap-16">
                <Experience />
                <Itineraries />
            </div>
        </div>
    );
}

export default Profile;