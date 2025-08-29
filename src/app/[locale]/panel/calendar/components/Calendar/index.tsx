"use client";
import CalendarScheduleDay from "@/app/[locale]/panel/calendar/components/CalendarScheduleDay";
import type { BCCalendarCardType } from "@/shared/components/baseComponents/BCCalendar/index.types";
import { Flex } from "@mantine/core";

export default function Calendar() {
	const reservationsInitials: BCCalendarCardType<{ client: string }>[] = [
		{
			masterIndex: 0,
			client: "Alice",
			start: 10.5,
			end: 12.75,
			id: "res-1",
			children: (
				<Flex h={20} bg={"gray.3"} align={"center"} w={"100%"}>
					Alice
				</Flex>
			),
		},
		{
			masterIndex: 0,
			client: "Alice 2",
			start: 15.76,
			end: 16.75,
			id: "res-3",
			children: (
				<Flex h={20} bg={"gray.3"} align={"center"} w={"100%"}>
					Alice 2
				</Flex>
			),
		},
		{
			masterIndex: 2,
			client: "Bob",
			start: 11,
			end: 17,
			id: "res-2",
			children: (
				<Flex h={50} bg={"yellow.3"} align={"center"} w={"100%"}>
					Bob
				</Flex>
			),
		},
	];
	return (
		<Flex direction={"column"}>
			<CalendarScheduleDay
				columns={[
					{
						name: "1PP",
						id: "1PP",
						label: "1PP",
					},
					{
						name: "2PP",
						id: "2PP",
						label: "2PP",
					},
					{
						name: "3PP",
						id: "3PP",
						label: "3PP",
					},
					{
						name: "4PP",
						id: "4PP",
						label: "4PP",
					},
					{
						name: "5PP",
						id: "5PP",
						label: "5PP",
					},
					{
						name: "6PP",
						id: "6PP",
						label: "6PP",
					},
					{
						name: "7PP",
						id: "7PP",
						label: "7PP",
					},
					{
						name: "8PP",
						id: "8PP",
						label: "8PP",
					},
					{
						name: "9PP",
						id: "9PP",
						label: "Alicia",
					},
					{
						name: "10PP",
						id: "10PP",
						label: "Elena",
					},
				]}
				reservations={reservationsInitials}
			/>
		</Flex>
	);
}
