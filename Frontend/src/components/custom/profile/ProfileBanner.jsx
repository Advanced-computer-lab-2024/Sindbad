import ImagePlaceholder from "../ImagePlaceholder";
import { BadgeCheck, Phone, Link } from "lucide-react";
import { useUser } from '@/state management/userInfo';
import { Edit3 } from "lucide-react";

function ProfileBanner({ userData, userId, id }) {
    const { type } = useUser();

    function camelCaseToEnglish(str) {
        let result = str.replace(/([A-Z])/g, ' $1').replace(/^./, function (match) {
            return match.toUpperCase();
        });
        return result.trim();
    }

    return (
        <section className="group relative w-[280px] border border-neutral-600 rounded-md overflow-clip flex flex-col items-center shrink-0 pb-6 bg-gradient-to-b from-light/[0.03] to-transparent">
            <div className="h-[110px] w-full">
                <ImagePlaceholder />
                {id === userId &&
                    <button className="absolute top-2 right-2 border-2 border-dark opacity-0 group-hover:opacity-100 transition-all hover:border-secondary bg-primary-900 p-1.5 rounded-full">
                        <Edit3 size={16} />
                    </button>
                }
            </div>
            <div className="px-6 w-full flex flex-col gap-5">
                <div className="flex flex-col -mt-10 w-full items-center gap-3">
                    <div className="rounded-full h-[116px] w-[116px] border-2 border-dark">
                        <ImagePlaceholder />
                    </div>
                    <div>
                        <div className="flex items-center gap-1.5">
                            <h3 className="font-inter font-bold text-xl break-all">
                                {userData.username}
                            </h3>
                            <div className="shrink-0">
                                {type !== "tourist" && <BadgeCheck size={19} />}
                            </div>
                        </div>
                        <h4 className="text-center font-semibold text-base text-neutral-500">
                            {camelCaseToEnglish(type)}
                        </h4>
                    </div>
                    {type === "tourGuide" &&
                        <div className="flex gap-1 items-center bg-gradient-to-br from-primary-700 to-primary-900 px-3 py-1.5 rounded-full">
                            <div className="shrink-0">
                                <Phone size={16} />
                            </div>
                            <p className="text-xs leading-[11px]">{userData.mobileNumber}</p>
                        </div>
                    }
                </div>
                {/* <hr className="border-neutral-700 border" />
                <div className="flex flex-col gap-1.5">
                    <div className="flex gap-1">
                        <div className="shrink-0 pt-[1px]">
                            <Link size={16} />
                        </div>
                        <a className="text-xs break-all">
                            Link 1
                        </a>
                    </div>
                    <div className="flex gap-1">
                        <div className="shrink-0 pt-[1px]">
                            <Link size={16} />
                        </div>
                        <a className="text-xs break-all">
                            Link 2
                        </a>
                    </div>
                </div> */}
            </div>
        </section>
    );
}

export default ProfileBanner;