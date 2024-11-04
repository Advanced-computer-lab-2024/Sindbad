import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

export default function TableSkeleton({ rows = 5, cols = 3 }) {
	// Use destructuring for rows and cols
	return (
		<Table>
			<TableHeader>
				<TableRow>
					{Array.from({ length: cols }).map((_, j) => (
						<TableHead key={j} className="w-[100px]">
							<Skeleton className="w-20 h-4 bg-foreground" />
						</TableHead>
					))}
				</TableRow>
			</TableHeader>
			<TableBody>
				{Array.from({ length: rows }).map((_, i) => (
					<TableRow key={i}>
						{Array.from({ length: cols }).map((_, j) => (
							<TableCell key={j}>
								<Skeleton className="w-24 h-4 bg-muted-foreground" />
							</TableCell>
						))}
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
