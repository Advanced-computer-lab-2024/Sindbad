import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

import { useUser } from "@/state management/userInfo";

import CardMenu from "./CardMenu";
import GenericForm from "../genericForm/genericForm";

const cardConfig = {
	actions: {
	},
};

function FlightCard({ data, fetchCardData, styles }) {
	const [openDialog, setOpenDialog] = useState("");
	const navigate = useNavigate();
	const { role, id } = useUser();

	return (
    <article className={styles.container}>
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
      <div className={styles.noImageDetailsContainer}>
        <h4 className={styles.title}>
          {"Aircraft " +
            data.itineraries[0].segments[0].aircraft.code +
            " Flight " +
            data.itineraries[0].segments[0].number}
        </h4>
        <div className="flex flex-col gap-1">
          <Dialog>
            <DialogTrigger asChild>
              <Button className={styles.button}>
                <p className={styles.buttonText}>Book </p>
                <div className={styles.buttonIcon}>
                  <ArrowRight size={13} />
                </div>
              </Button>
            </DialogTrigger>
            <DialogContent className="overflow-y-scroll max-h-[50%]">
              <DialogTitle>Book Flight</DialogTitle>
              <GenericForm type="flightBooking" data={data} id={id} />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </article>
  );
}

export default FlightCard;
