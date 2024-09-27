import ImagePlaceholder from "../ImagePlaceholder";
import { BadgeCheck, Phone, Link } from "lucide-react";

function ProfileBanner() {
    return (
        <section className="w-[350px] border border-neutral-600 rounded-md overflow-clip flex flex-col items-center shrink-0 pb-8 bg-gradient-to-b from-light/[0.03] to-transparent">
            <div className="h-[140px] w-full">
                <ImagePlaceholder />
            </div>
            <div className="px-7 w-full flex flex-col gap-6">
                <div className="flex flex-col -mt-12 w-full items-center gap-4">
                    <div className="rounded-full h-[145px] w-[145px] border-2 border-dark">
                        <ImagePlaceholder />
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <h3 className="font-inter font-bold text-2xl break-all">
                                John Doe
                            </h3>
                            <div className="shrink-0">
                                <BadgeCheck />
                            </div>
                        </div>
                        <h4 className="text-center font-semibold text-xl text-neutral-500">
                            Tour Guide
                        </h4>
                    </div>
                    <div className="flex gap-1 items-center bg-gradient-to-br from-primary-700 to-primary-900 px-4 py-2 rounded-full">
                        <div className="shrink-0">
                            <Phone size={20} />
                        </div>
                        <p className="text-[14px] leading-[14px]">+20 109 1234 567</p>
                    </div>
                </div>
                <hr className="border-neutral-700 border" />
                <div className="flex flex-col gap-2">
                    <div className="flex gap-1">
                        <div className="shrink-0 pt-[1px]">
                            <Link size={20} />
                        </div>
                        <a className="text-base break-all">
                            Link 1
                        </a>
                    </div>
                    <div className="flex gap-1">
                        <div className="shrink-0 pt-[1px]">
                            <Link size={20} />
                        </div>
                        <a className="text-base break-all">
                            Link 2
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ProfileBanner;