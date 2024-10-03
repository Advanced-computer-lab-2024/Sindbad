import ImagePlaceholder from "../ImagePlaceholder";
import { BadgeCheck, Phone, Link } from "lucide-react";
import { useUser } from '@/state management/userInfo';
import { Edit3, Mail, Cake, Globe2, Briefcase } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import GenericForm from "../genericForm";


function ProfileBanner({ userData, userId, id }) {
    const { type } = useUser();
    function camelCaseToEnglish(str) {
        let result = str.replace(/([A-Z])/g, ' $1').replace(/^./, function (match) {
            return match.toUpperCase();
        });
        return result.trim();
    }

    function formatDate(date) {
        const d = new Date(date);
        return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
    }

    return (
        <section className="group relative w-[280px] border border-neutral-600 rounded-md overflow-clip flex flex-col items-center shrink-0 pb-6 bg-gradient-to-b from-light/[0.03] to-transparent">
            <div className="h-[110px] w-full">
                <ImagePlaceholder />
                {id === userId &&
                        <Dialog>
                        <DialogTrigger>
                        <button className="absolute top-2 right-2 border-2 border-dark opacity-0 group-hover:opacity-100 transition-all hover:border-secondary bg-primary-900 p-1.5 rounded-full">
                            <Edit3 size={16} />
                        </button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Edit Profile</DialogTitle>
                                <GenericForm type={type} userData={userData}>

                                </GenericForm>
                                <DialogDescription>
                                This action cannot be undone. This will permanently delete your account
                                and remove your data from our servers.
                                </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                    
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
                            {type !== "tourist" &&
                                <div className="shrink-0">
                                    <BadgeCheck size={19} />
                                </div>
                            }
                        </div>
                        <h4 className="text-center font-semibold text-base text-neutral-500">
                            {camelCaseToEnglish(type)}
                        </h4>
                    </div>
                    {userData.mobileNumber &&
                        <div className="flex gap-1 items-center bg-gradient-to-br from-primary-700 to-primary-900 px-3 py-1.5 rounded-full">
                            <div className="shrink-0">
                                <Phone size={16} />
                            </div>
                            <p className="text-xs leading-[11px]">{userData.mobileNumber}</p>
                        </div>
                    }
                </div>
                {type === "tourist" && userId === id &&
                    <>
                        <hr className="border-neutral-700 border" />
                        <div className="flex flex-col gap-2">
                            <div className="flex gap-2">
                                <div className="shrink-0">
                                    <Mail size={16} />
                                </div>
                                <a className="text-xs break-all pt-[1px]">
                                    {userData.email}
                                </a>
                            </div>
                            <div className="flex gap-2">
                                <div className="shrink-0">
                                    <Cake size={16} />
                                </div>
                                <a className="text-xs break-all pt-[1px]">
                                    {formatDate(userData.DOB)}
                                </a>
                            </div>
                            <div className="flex gap-2">
                                <div className="shrink-0">
                                    <Globe2 size={16} />
                                </div>
                                <a className="text-xs break-all pt-[1px]">
                                    {userData.nationality}
                                </a>
                            </div>
                            <div className="flex gap-2">
                                <div className="shrink-0">
                                    <Briefcase size={16} />
                                </div>
                                <a className="text-xs break-all pt-[1px]">
                                    {userData.job}
                                </a>
                            </div>
                        </div>
                    </>
                }
                {/* <hr className="border-neutral-700 border" />
                <div className="flex flex-col gap-2">
                    <div className="flex gap-2">
                        <div className="shrink-0">
                            <Link size={16} />
                        </div>
                        <a className="text-xs break-all pt-[1px]">
                            Link 1
                        </a>
                    </div>
                    <div className="flex gap-2">
                        <div className="shrink-0">
                            <Link size={16} />
                        </div>
                        <a className="text-xs break-all pt-[1px]">
                            Link 2
                        </a>
                    </div>
                </div> */}
            </div>
        </section>
    );
}

export default ProfileBanner;