import ImagePlaceholder from "@/components/custom/ImagePlaceholder";

const CardImage = ({ imageUris, altText }) => {
    console.log(imageUris);
	return (
		<div className="h-[156px] relative shrink-0 bg-neutral-300">
			{imageUris && imageUris.length !== 0 ? (
				<img
					src={imageUris[0]}
					alt={altText}
					className="object-cover h-full w-full"
				/>
			) : (
				<ImagePlaceholder />
			)}
		</div>
	);
};

export default CardImage;
