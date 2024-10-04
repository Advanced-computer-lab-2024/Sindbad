import { Edit, MapPin } from "lucide-react";

function CompanyProfile({ userData, userId, id }) {
    return (
        <div className="flex flex-col gap-2">
            <div>
                <div className="flex items-center gap-6">
                    <h1 className="text-3xl font-extrabold">
                        Company
                    </h1>
                    <hr className="border-neutral-700 border w-full mt-1.5" />
                    {userId === id &&
                        <button className="shrink-0 mt-1.5 text-neutral-600 hover:text-light transition-all">
                            <Edit size={24} />
                        </button>
                    }
                </div>
            </div>
            <div className="flex flex-col gap-3">
                {(userData?.companyProfile?.name === "" || !userData?.companyProfile?.name) ?
                    <p className="text-neutral-400 text-sm italic">
                        {userId !== id ? "No company details to show." : "You have not added your company's details yet. Click the edit button to get started!"}
                    </p>
                    :
                    <div>
                        <h4 className="py-3 text-xl font-medium">
                            {userData.companyProfile.name}
                        </h4>
                        <div className="flex gap-5">
                            <div className="border-l-[2px] border-neutral-500"></div>
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-1 text-neutral-400">
                                    <MapPin size={16} />
                                    <h4 className="text-base">
                                        {userData.companyProfile.location}
                                    </h4>
                                </div>
                                <p className="leading-5 text-xs">
                                    {userData.companyProfile.description}
                                </p>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}

export default CompanyProfile;