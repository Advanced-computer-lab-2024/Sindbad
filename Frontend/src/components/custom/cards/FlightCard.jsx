import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

import { useUser } from "@/state management/userInfo";

import CardMenu from "./CardMenu";

const cardConfig = {
	actions: {
	},
};

function FlightCard({ data, fetchCardData, styles }) {
	const [openDialog, setOpenDialog] = useState("");
	const navigate = useNavigate();
	const { role, id } = useUser();

	return (
		<article
			className={styles.container}
		>
			<div className={styles.noImageContainer}>
				<CardMenu
					data={data}
					config={cardConfig}
					role={role}
					id={id}
					cardType="flight"
					fetchCardData={fetchCardData}
					openDialog={openDialog}
					setOpenDialog={setOpenDialog}
				/>
			</div>
			<div className={styles.detailsContainer}>
				<h4 className={styles.title}>{data.name}</h4>
				<div className="flex flex-col gap-1">

					<Button
						onClick={() => navigate(`/app/flight/${data.flightId}`)}
						className={styles.button}
					>
						<p className={styles.buttonText}>Book </p>
						<div className={styles.buttonIcon}>
							<ArrowRight size={13} />
						</div>
					</Button>
				</div>
			</div>
		</article>
	);
}

export default FlightCard;
