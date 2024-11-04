import UserVerification from "@/components/custom/admin/UserVerification";

function AdminVerificationView() {
    return (
        <div className="py-8 px-24 max-w-[1200px] flex flex-col gap-6 mx-auto">
            <UserVerification />
        </div>
    );
}

export default AdminVerificationView;