import ImagePlaceholder from "../ImagePlaceholder";
import { BadgeCheck, Phone, Link } from "lucide-react";

function ProfileBanner() {
    return (
        <section className="w-[280px] border border-neutral-600 rounded-md overflow-clip flex flex-col items-center shrink-0 pb-6 bg-gradient-to-b from-light/[0.03] to-transparent">
            <div className="h-[110px] w-full">
                <ImagePlaceholder />
            </div>
            <div className="px-6 w-full flex flex-col gap-5">
                <div className="flex flex-col -mt-10 w-full items-center gap-3">
                    <div className="rounded-full h-[116px] w-[116px] border-2 border-dark">
                        <ImagePlaceholder />
                    </div>
                    <div>
                        <div className="flex items-center gap-1.5">
                            <h3 className="font-inter font-bold text-xl break-all">
                                John Doe
                            </h3>
                            <div className="shrink-0">
                                <BadgeCheck size={19} />
                            </div>
                        </div>
                        <h4 className="text-center font-semibold text-base text-neutral-500">
                            Tour Guide
                        </h4>
                    </div>
                    <div className="flex gap-1 items-center bg-gradient-to-br from-primary-700 to-primary-900 px-3 py-1.5 rounded-full">
                        <div className="shrink-0">
                            <Phone size={16} />
                        </div>
                        <p className="text-xs leading-[11px]">+20 109 1234 567</p>
                    </div>
                </div>
                <hr className="border-neutral-700 border" />
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
                </div>
            </div>
        </section>
    );
}

export default ProfileBanner;