import BCChart from "@/shared/components/baseComponents/BCChart/BCChart";
import useBCChart from "@/shared/components/baseComponents/BCChart/hooks/useBCChart";
import { Box, Flex } from "@mantine/core";
import { type PropsWithChildren, useEffect } from "react";

type Props = PropsWithChildren<{
	chartId: string;
	items: [number, string][];
	value: number;
}>;

export default function CyberAssetDetailOverviewSecurityGaugeChart(props: Props) {
	const { chart } = useBCChart({ chartId: props.chartId });

	useEffect(() => {
		chart?.setOption({
			series: [
				{
					type: "gauge",
					startAngle: 180,
					endAngle: 0,
					center: ["50%", "50%"],
					radius: "100%",
					min: 0,
					max: 1,
					splitNumber: props.items.length,
					axisLine: {
						lineStyle: {
							width: 30,
							color: props.items,
						},
					},
					pointer: {
						icon: "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAWCAYAAAAmaHdCAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAEYSURBVHgBpVSBEYIwDIwuIBvYETpCR2AENpANYAPYgHMC3QCdQDcoTsA5AbaanCG2qPB3f9A0fD9NDoDvSGAhlKOFhWgcB8ccZiJDAc8eZpZlmYhnBX9iJwSI5pePlWMbEeCOoqVpeNU+oFCOMYUO/JpKtBj/cEACU53wDmomNHJkIwJJ6EQmVFIgxUAjPq6YO39IIfZ7YK2ngTIsiWKS3GmJscwvLrggKIh3pmd5VEG9Rjsd29QQB7/IDp+bNTtdbobQBQTvXuSMC4PPq+MpIrJn75rlB7ujHA8wvo9aCNJYKBkwIlFjTI55ETj4mUi3n8I0SCA4+hmz3ggHCe63UwLcvvyPSLZSYBURS5FbeM/RzfEIgc49ALPZdLboy/pmAAAAAElFTkSuQmCC",
						length: "40%",
						width: 23,
						offsetCenter: [0, "15%"],
						itemStyle: {
							color: "red",
						},
					},
					axisTick: {
						lineStyle: {
							color: "auto",
							width: 0,
						},
					},
					splitLine: {
						length: 20,
						lineStyle: {
							color: "auto",
							width: 0,
						},
					},
					axisLabel: {
						show: false,
					},
					title: {
						show: false,
					},
					detail: {
						show: false,
					},
					data: [
						{
							value: props.value,
							name: "",
						},
					],
				},
			],
		});
	}, [chart, props]);

	return (
		<Flex
			pos={"relative"}
			direction={"column"}
			align={"center"}
			bg={"white"}
			w={"100%"}
			p={"xs"}
			justify={"center"}
		>
			<Flex w={140} h={140}>
				<BCChart chart={chart} id={props.chartId} />
			</Flex>
			<Box pos={"absolute"} top={100}>
				{props.children}
			</Box>
		</Flex>
	);
}
