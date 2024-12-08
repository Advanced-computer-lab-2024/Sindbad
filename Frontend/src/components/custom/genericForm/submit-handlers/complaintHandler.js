import { createComplaint } from "@/services/ComplaintApiHandler";

export const complaintSubmit = (values, id, navigate, dispatch, currency, toast) => {
    const newComplaint  = {
      ...values,
      creatorId: id
    }
    createComplaint(newComplaint);
    console.log(values)
}