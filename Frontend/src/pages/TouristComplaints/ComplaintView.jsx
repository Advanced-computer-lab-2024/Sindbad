import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { DataTable } from "@/components/custom/admin/complaint-management/data-table";
import {columns} from "@/pages/TouristComplaints/columns";
import { createComplaint, getAllComplaints, getMyComplaints } from "@/services/ComplaintApiHandler";
import { getTouristById } from "@/services/TouristApiHandler";
import TableSkeleton from "@/components/custom/TableSkeleton";
import { set } from "date-fns";
import { Textarea } from "@/components/ui/textarea";
import GenericForm from "@/components/custom/genericForm/genericForm";


function ComplaintView(){
    
    const { creatorId } = useParams();
    const [loading, setLoading] = useState(false);
    const [tableData, setTableData] = useState(null);
    
    useEffect(() => {
		if (creatorId) {
			getTouristById(creatorId);
		}
	}, [creatorId]);

    const getTableData = async (creatorId)=>{
        
        setLoading(true);
        let Complaints = await getMyComplaints(creatorId);
        const myComplaints = Complaints.data
        setLoading(false);
        
        console.log(myComplaints);
        setTableData(myComplaints);
        console.log(tableData);
    }

    useEffect(() => {
		getTableData(creatorId);
	}, []);



    

    return(
        <div className="w-full min-h-screen flex flex-col">
            <div className="flex flex-col justify-center items-center p-12">
                    <h1 className="font-semibold text-3xl mb-8">
                        Thank you for reaching out, What's the issue?
                    </h1>
                    <div className="w-2/5 flex flex-col gap-4">
                        {/* <Form {...complaintForm}>
                            <form onSubmit={complaintForm.handleSubmit(handleComplaintFormSubmit)} className="gap-2 flex flex-col">
                                {renderComplaintforms()}
                                {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                                <Button type="submit" disabled={loading} className="bg-primary-700 justify-center w-full mt-4">
                                    Submit report
                                </Button>
                            </form>
                        </Form> */}
                        <GenericForm type="complaint" id={creatorId} />
                    </div>
            </div>

            <hr className="border-neutral-300 border w-1/2 mt-1.5 self-center" />
            
            <div className="flex flex-col w-full justify-center items-center">
                <h1 className="font-semibold text-2xl mb-4 p-8 text-s">
                    Past reports
                </h1>
               
                {loading?
                     <TableSkeleton rows={5} columns={4}/>
                : tableData?
                <DataTable className="w-full" columns={columns()} data={tableData} />
                :
                    "No prior reports"
                }
                
            </div>
        </div>
    )

}
export default ComplaintView;