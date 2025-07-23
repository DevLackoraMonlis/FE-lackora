import { basicBrowserDownload } from "@/shared/lib/utils";
import dayjs from "dayjs";
import { json2csv } from "json-2-csv";

export default function useExportCSV<T>() {
	const defaultFileName = `${dayjs().format("YYYY/MM/DD HH:mm:ss")}.csv`;
	const downloadCSV = async (params: {
		data?: T[];
		fileName?: string;
		excludeKeys?: string[];
	}) => {
		if (!params.data?.length) return;

		const csv = json2csv(params.data as object[], {
			excludeKeys: params.excludeKeys,
			emptyFieldValue: "",
		});
		const blob = new Blob([csv], { type: "text/csv" });
		const url = window.URL.createObjectURL(blob);
		basicBrowserDownload(url, params.fileName || defaultFileName);
	};

	return { downloadCSV };
}
