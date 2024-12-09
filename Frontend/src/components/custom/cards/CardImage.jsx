import ImagePlaceholder from "@/components/custom/ImagePlaceholder";

const CardImage = ({ imageSrc, altText }) => {
	return (
		<div className="h-[156px] relative shrink-0 bg-neutral-300">
			{imageSrc && imageSrc.url ? (
				<img
					src={imageSrc.url}
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
