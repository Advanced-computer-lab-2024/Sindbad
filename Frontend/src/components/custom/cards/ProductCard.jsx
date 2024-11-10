import { useNavigate } from "react-router-dom";
import { useState } from "react";

import StarRating from "../StarRating";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

import { useUser } from "@/state management/userInfo";

import CardImage from "./CardImage";
import CardPrice from "./CardPrice";
import CardMenu from "./CardMenu";

const cardConfig = {
	actions: {
		edit: [],
		toggleArchive: [],
	},
};

function ProductCard({ data, fetchCardData, styles }) {
	const [openDialog, setOpenDialog] = useState("");
	const navigate = useNavigate();
	const { role, id } = useUser();

	return (
		<article
			className={`${styles.container} ${
				data.isArchived === true
					? styles.inactive
					: styles.active
			}`}
		>
			<div className={styles.imageContainer}>
				<CardImage imageUris={data.imageUris} altText={data.name} />
				<CardMenu
					data={data}
					config={cardConfig}
					role={role}
					id={id}
					cardType="product"
					fetchCardData={fetchCardData}
					openDialog={openDialog}
					setOpenDialog={setOpenDialog}
				/>
			</div>
			<div className={styles.detailsContainer}>
				<h4 className={styles.title}>{data.name}</h4>
				<div className="flex flex-col gap-1">
					<StarRating rating={data.averageRating ? data.averageRating : 0} size={16} />
					<CardPrice price={data.price} />
						<Button
						onClick={() => navigate(`/app/product/${data._id}`)}
						className={`${styles.button} ${
							data.isArchived === true
								? styles.buttonInactive
								: styles.buttonActive
						}`}
					>
						<p className={styles.buttonText}>Read more</p>
						<div className={styles.buttonIcon}>
							<ArrowRight size={13} />
						</div>
					</Button>
				</div>
			</div>
		</article>
	);
}

export default ProductCard;
