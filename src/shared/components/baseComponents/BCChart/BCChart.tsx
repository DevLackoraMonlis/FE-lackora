import { Box } from "@mantine/core";
import { useResizeObserver } from "@mantine/hooks";
import type { EChartsType } from "echarts";
import type { PropsWithChildren } from "react";
import { useEffect } from "react";

export type Props = {
	id: string;
	chart?: EChartsType;
	className?: string;
	isFullScreen?: boolean;
} & PropsWithChildren;
function BCChart(props: Props) {
	const [ref, rect] = useResizeObserver();

	useEffect(() => {
		props.chart?.resize();
	}, [props.chart, rect, props.isFullScreen]);

	return (
		<Box h="100%" w="100%" id={props.id} ref={ref} className={props.className}>
			{props.children}
		</Box>
	);
}

export default BCChart;
