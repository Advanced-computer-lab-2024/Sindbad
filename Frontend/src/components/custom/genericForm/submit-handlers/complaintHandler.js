import { createComplaint } from "@/services/ComplaintApiHandler";

export const complaintSubmit = async (values, id, navigate, dispatch, currency, toast, setLoading) => {
  setLoading(true);
  const newComplaint = {
    ...values,
    creatorId: id
  }
  // createComplaint(newComplaint);

  try {
    let response = await createComplaint(newComplaint);

    if (response && !response.error && navigate) {
      navigate("/app/complaints");
      toast({ description: "Complaint submitted successfully" });
      setLoading(false);
    } else {
      throw new Error("API did not return a success response");
    }
  } catch (error) {
    console.error("Error submitting form:", error);
    toast({ description: "Error submitting complaint" });
    setLoading(false);
  }
}