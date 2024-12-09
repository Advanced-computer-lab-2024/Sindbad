import { useParams } from "react-router-dom";
import GenericForm from "@/components/custom/genericForm/genericForm";
import { useUser } from "@/state management/userInfo";

function CreateFormPage() {
    const { cardType } = useParams();
    const { id } = useUser();

    return (
        <div className="py-8 px-24 max-w-[1200px] mx-auto">
            <div className="flex items-center gap-6 mb-3">
                <h1 className="text-xl font-bold shrink-0">Create {String(cardType).charAt(0).toUpperCase() + String(cardType).slice(1)}</h1>
                <hr className="border-neutral-300 border w-full mt-1.5" />
            </div>
            <div className="w-2/3 mx-auto">
                <GenericForm type={cardType} id={id} />
            </div>
        </div>
    );
}

export default CreateFormPage;