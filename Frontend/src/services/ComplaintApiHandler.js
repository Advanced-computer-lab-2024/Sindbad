import axiosInstance from "./axiosInstance";

export const getAllComplaints = async () => {
	try {
		// Fetch all complaints
		let users = await axiosInstance.get(`/complaint/`);
		return users;
	} catch (error) {
		console.error("Error fetching complaints: ", error);
		return error;
	}
};

export const getComplaintById = async (complaintId) => {
    try {
        // Fetch a complaint by id
        let complaint = await axiosInstance.get(`/complaint/${complaintId}`);
        return complaint;
    } catch (error) {
        console.error("Error fetching complaint: ", error);
        return error;
    }
}

export const replyToComplaint = async (complaintId, isResolved, comment) => {
    try {
        // Reply to a complaint
        let response = await axiosInstance.put(`/complaint/${complaintId}`, {
            isResolved,
            comment
        });
        return response;
    } catch (error) {
        console.error("Error replying to complaint: ", error);
        return error;
    }
}

export const getMyComplaints = async (creatorId) => {
    try{
        let complaints = await axiosInstance.get(`/complaint/my-complaints/${creatorId}`, 
            {
            resourceName: "Complaint",
            });
        return complaints;
    }catch (error){
        console.error("Error fetching compaints: ", error);
        return error;
    }
}

export const createComplaint = async (complaintData) => {
    try {
        const response = await axiosInstance.post(`/complaint`, complaintData);
        console.log(response.data);
        return response.data;
    } catch (error){
        return error;
    }
};