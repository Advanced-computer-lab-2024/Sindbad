import ImagePlaceholder from "./ImagePlaceholder";

function ProfileBanner() {
    return (
        <section className="w-[350px] border border-light/25 rounded overflow-clip flex flex-col items-center">
            <div className="h-[140px] w-full rounded-t-[inherit]">
                <ImagePlaceholder />
            </div>
            <div className="flex flex-col p-7 -mt-20 w-full items-center gap-4">
                <div className="rounded-full h-[145px] w-[145px]">
                    <ImagePlaceholder />
                </div>
                <h1>John Doe</h1>
            </div>
        </section>
    );
}

export default ProfileBanner;