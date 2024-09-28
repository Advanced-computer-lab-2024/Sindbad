import ProfileBanner from "@/components/custom/profile/ProfileBanner";
import Wallet from "@/components/custom/profile/Wallet";
import Experience from "@/components/custom/profile/Experience";
import Itineraries from "@/components/custom/timelines/Itineraries";

function Profile() {
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