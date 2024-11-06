import { createComplaint } from "@/services/ComplaintApiHandler";

export const complaintSubmit = (values) => {
    createComplaint(values);
    console.log(values)
  }