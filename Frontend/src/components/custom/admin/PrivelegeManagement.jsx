import { useState } from "react";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { userSignUp } from "@/services/LoginSignupApiHandler";

export default function PrivilegeManagement() {
	// Default password is the same as email
	const formSchema = z.object({
		username: z.string().min(2, {
			message: "Username must be at least 2 characters",
		}),
		email: z.string().regex(/^\S+@\S+\.\S+$/, {
			message: "Invalid email",
		}),
		password: z.string().min(6, {
			message: "Password must be at least 6 characters",
		}),
	});

	const defaultValues = {
		username: "",
		email: "",
		password: "",
	};

	// State for feedback messages
	const [message, setMessage] = useState(null);

	// Create a hook form instance for Admin and Tourism Governor
	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: defaultValues,
	});

	// Handle form submission
	const handleAdminSubmit = async (data) => {
		data.password = data.email; // Ensure password is set
		const result = await userSignUp({ ...data }, "Admin");

		if (result.error) {
			// If there's an error, set the error message
			setMessage({ type: "error", text: result.message });
		} else {
			// On success, set the success message
			setMessage({ type: "success", text: "Admin added successfully." });
		}
	};

	const handleGovernorSubmit = async (data) => {
		data.password = data.email; // Ensure password is set
		const result = await userSignUp({ ...data }, "TourismGovernor");

		if (result.error) {
			// If there's an error, set the error message
			setMessage({ type: "error", text: result.message });
		} else {
			// On success, set the success message
			setMessage({
				type: "success",
				text: "Tourism Governor added successfully.",
			});
		}
	};

	// Form fields rendering helper
	const renderFormFields = (form) => (
		<div className="flex gap-4">
			<FormField
				control={form.control}
				name="username"
				render={({ field }) => (
					<FormItem className="w-full">
						<FormLabel htmlFor="username">Username</FormLabel>
						<FormControl>
							<Input id="username" {...field} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				control={form.control}
				name="email"
				render={({ field }) => (
					<FormItem className="w-full">
						<FormLabel htmlFor="email">Email</FormLabel>
						<FormControl>
							<Input id="email" {...field} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				control={form.control}
				name="password"
				render={({ field }) => (
					<FormItem className="w-full">
						<FormLabel htmlFor="password">Password</FormLabel>
						<FormControl>
							<Input id="password" {...field} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
		</div>
	);

	return (
		<>
			<div className="flex items-center gap-6">
				<h1 className="text-3xl font-extrabold">Add Privileges</h1>
				<hr className="border-neutral-700 border w-full mt-1.5" />
			</div>

			{message && (
				<div
					className={`p-2 rounded-lg ${message.type === "error"
						? "bg-destructive text-light"
						: "bg-secondary text-dark"
						}`}
				>
					{message.text}
				</div>
			)}

			<Accordion type="single" collapsible className="w-full">
				<AccordionItem value="item-1">
					<AccordionTrigger>New Admin</AccordionTrigger>
					<AccordionContent>
						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(handleAdminSubmit)}
								className="space-y-4"
							>
								{renderFormFields(form)}
								<div className="flex justify-end">
									<Button
										type="submit"
										className="bg-primary-700 px-4 py-2 w-auto"
									>
										Add Admin
									</Button>
								</div>
							</form>
						</Form>
					</AccordionContent>
				</AccordionItem>

				<AccordionItem value="item-2">
					<AccordionTrigger>New Tourism Governor</AccordionTrigger>
					<AccordionContent>
						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(handleGovernorSubmit)}
								className="space-y-4"
							>
								{renderFormFields(form)}
								<div className="flex justify-end">
									<Button
										type="submit"
										className="bg-primary-700 px-4 py-2 w-auto"
									>
										Add Tourism Governor
									</Button>
								</div>
							</form>
						</Form>
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</>
	);
}
