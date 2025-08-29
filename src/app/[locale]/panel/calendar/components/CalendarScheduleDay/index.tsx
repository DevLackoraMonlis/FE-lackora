import BCCalendar from "@/shared/components/baseComponents/BCCalendar";
import type {
	BCCalendarCardType,
	BCDefaultCalendarColumnType,
} from "@/shared/components/baseComponents/BCCalendar/index.types";

type Props = {
	reservations: BCCalendarCardType<{ client: string }>[];
	columns: BCDefaultCalendarColumnType[];
};

export default function CalendarScheduleDay(props: Props) {
	return <BCCalendar endHour={20} columns={props.columns} initialCardValues={props.reservations} />;
}
