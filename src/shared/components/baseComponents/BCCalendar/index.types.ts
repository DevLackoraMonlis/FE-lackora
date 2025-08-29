import type { ReactNode } from "react";

export type BCDefaultCalendarCardType = {
	masterIndex: number;
	start: number;
	end: number;
	id: string;
	children?: ReactNode;
};

export type BCCalendarCardType<T = null> = T extends Record<string, unknown>
	? BCDefaultCalendarCardType & T
	: BCDefaultCalendarCardType;

export type BCDefaultCalendarColumnType = {
	name: string;
	label: ReactNode;
	id: string;
};

export type BCCalendarColumnType<T = null> = T extends Record<string, unknown>
	? BCDefaultCalendarColumnType & T
	: BCDefaultCalendarColumnType;

export type BCCalendarProps<ColumnType, CardType> = {
	columns: BCCalendarColumnType<ColumnType>[];
	initialCardValues: BCCalendarCardType<CardType>[];
	startHour?: number;
	endHour?: number;
	headerRowHeight?: number;
	rowWidth?: number;
	timeColumnWidth?: number;
	rowHeight?: number;
	confirmMoveLabel?: string;
	onConfirmMoveChildren?: (params: { start: number; column: string }) => ReactNode;
	onConfirmMove?: (params: { start: number; columnId: string }) => ReactNode;
};
