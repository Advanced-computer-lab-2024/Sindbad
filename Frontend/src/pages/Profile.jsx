import ProfileBanner from "@/components/custom/profile/ProfileBanner";
import Wallet from "@/components/custom/profile/Wallet";

function Profile() {
    return (
        <div className="py-20 px-12 max-w-[1700px] flex">
            <div className="flex flex-col w-max gap-12">
                <ProfileBanner />
                <Wallet />
            </div>
        </div>
    );
}

export default Profile;