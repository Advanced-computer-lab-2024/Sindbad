import { useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { replyToComplaint } from "@/services/ComplaintApiHandler";

function IsResolvedCheckbox({ isResolved, setIsResolved }) {
	return (
		<div className="flex items-center space-x-2">
			<Checkbox id="isResolved" checked={isResolved} onCheckedChange={setIsResolved} />
			<label
				htmlFor="isResolved"
				className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
			>
				Resolved
			</label>
		</div>
	);
}

export default function ComplaintDetails({ data, refreshData }) {
	const [comment, setComment] = useState("");
	const [isResolved, setIsResolved] = useState(false);

	useEffect(() => {
		if (data) {
			setComment(data.comment || "");
			setIsResolved(data.isResolved || false);
		}
	}, [data]);

	const handleSubmit = async () => {
		try {
			await replyToComplaint(data._id, isResolved, comment);
			alert("Response submitted successfully!");
			refreshData();
		} catch (error) {
			alert("Failed to submit response.");
		}
	};

	if (!data) return (
		<div className="flex flex-col h-full bg-background rounded-r-md gap-2 p-3 justify-center items-center">
			<h1 className="text-xl font-light italic text-muted-foreground">Select a complaint</h1>
		</div>
	);

	return (
		<div className="flex flex-col bg-background rounded-r-md gap-2 p-3 justify-center">
			<h1 className="text-xl font-bold">{data.title}</h1>
			<h3 className="text-muted-foreground italic">
				{data.creatorId ? (
					<>
						{data.creatorId.username || "Unknown User"}
						{data.creatorId.username && data.creatorId.email ? " - " : ""}
						{data.creatorId.email || "No Email"}
					</>
				) : (
					"Invalid User"
				)}
			</h3>
			<Separator />
			<ScrollArea className="max-h-1/4">
				<p>{data.body}</p>
			</ScrollArea>
			<Separator />
			<h3 className="font-bold">Response</h3>
			<Textarea value={comment} onChange={(e) => setComment(e.target.value)} />
			<div className="flex gap-32 justify-center">
				<IsResolvedCheckbox isResolved={isResolved} setIsResolved={setIsResolved} />
				<Button onClick={handleSubmit}>Submit</Button>
			</div>
		</div>
	);
}
