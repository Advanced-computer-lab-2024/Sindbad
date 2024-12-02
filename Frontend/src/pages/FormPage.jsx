import { useLocation, useParams } from "react-router-dom";
import GenericForm from "@/components/custom/genericForm/genericForm";

function FormPage() {
    const location = useLocation();
    const { data } = location.state || {};
    const { cardType, cardId } = useParams();

    return (
        <div className="py-8 px-24 max-w-[1200px] mx-auto">
            <GenericForm type={cardType} id={cardId} data={data} />
        </div>
    );
}

export default FormPage;