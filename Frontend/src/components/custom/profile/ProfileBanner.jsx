import ImagePlaceholder from "../ImagePlaceholder";
import GenericForm from "../genericForm";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

import { BadgeCheck, Phone, Link, Edit3, Mail, Cake, Globe2, Briefcase } from "lucide-react";


function ProfileBanner({ userData, profileId, id, profileRole }) {
    // convert camelCase to English (e.g. tourGuide -> Tour Guide) to display the role
    function camelCaseToEnglish(str) {
        let result = str.replace(/([A-Z])/g, ' $1').replace(/^./, function (match) {
            return match.toUpperCase();
        });
        return result.trim();
    }

    // format date to dd/mm/yyyy
    function formatDate(date) {
        const d = new Date(date);
        return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
    }

    return (
        <section className="group relative w-[280px] border border-neutral-300 rounded-md overflow-clip flex flex-col items-center shrink-0 pb-6 bg-gradient-to-b from-neutral-200/60 to-light">
            <div className="h-[110px] w-full">
                {/* header image */}
                <ImagePlaceholder />
                {/* profile edit button (only visible if logged-in user id is the same id as the profile) */}
                {id === profileId && (userData.isAccepted === undefined || userData.isAccepted === true) &&
                    <Dialog>
                        <DialogTrigger className="icon-button">
                            <Edit3 size={16} />
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Edit Profile</DialogTitle>
                                <GenericForm type={profileRole} data={userData} id={id} />
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                }
            </div>

            <div className="px-6 w-full flex flex-col gap-5">
                <div className="flex flex-col -mt-10 w-full items-center gap-3">
                    {/* profile photo */}
                    <div className="rounded-full h-[116px] w-[116px] border-2 border-light">
                        <ImagePlaceholder />
                    </div>

                    <div>
                        <div className="flex items-center justify-center gap-1.5">
                            {/* username (or name) */}
                            <h3 className="font-inter font-bold text-xl break-all text-center">
                                {
                                    profileRole !== "seller" || (userData.firstName === undefined && userData.lastName === undefined) ? userData.username :
                                        (userData.firstName !== undefined && userData.firstName) + " " + (userData.lastName !== undefined && userData.lastName)
                                }
                            </h3>
                            {/* badge to appear if accepted onto system */}
                            {profileRole !== "tourist" && userData.isAccepted && userData.isAccepted === true &&
                                <div className="shrink-0">
                                    <BadgeCheck size={19} />
                                </div>
                            }
                        </div>
                        {/* role (and username if seller) */}
                        <h4 className="text-center font-semibold text-base text-neutral-500">
                            <span className="break-all">
                                {profileRole === "seller" && `@${userData.username} ‧ `}
                            </span>
                            {camelCaseToEnglish(profileRole)}
                        </h4>
                        {userData.description &&
                            <p className="text-xs leading-[11px] text-center mt-3">
                                {userData.description}
                            </p>
                        }
                    </div>

                    {/* phone number */}
                    {(userData.mobileNumber || userData.hotline) &&
                        <div className="flex gap-1 items-center bg-gradient-to-br from-primary-700 to-primary-900 px-3 py-1.5 rounded-full">
                            <div className="shrink-0">
                                <Phone size={16} />
                            </div>
                            <p className="text-xs leading-[11px]">{profileRole === "advertiser" ? userData.hotline : userData.mobileNumber}</p>
                        </div>
                    }
                </div>

                <hr className="border-neutral-300 border" />

                <div className="flex flex-col gap-2">
                    <div className="flex gap-2">
                        <div className="shrink-0">
                            <Mail size={16} />
                        </div>
                        <a className="text-xs break-all pt-[1px]">
                            {userData.email}
                        </a>
                    </div>
                    {profileRole === "tourist" && profileId === id &&
                        <>
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
                        </>
                    }
                    {profileRole === "advertiser" && userData.websiteLink &&
                        <div className="flex flex-col gap-2">
                            <div className="flex gap-2">
                                <div className="shrink-0">
                                    <Link size={16} />
                                </div>
                                <a className="text-xs break-all pt-[1px] hover:underline" href={`https://${userData.websiteLink}`} target="_blank" rel="noreferrer">
                                    {userData.websiteLink}
                                </a>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </section>
    );
}

export default ProfileBanner;