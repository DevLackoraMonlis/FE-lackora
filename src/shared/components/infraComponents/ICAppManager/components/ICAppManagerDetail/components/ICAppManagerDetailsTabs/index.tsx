import ICAppManagerDetailsHistoryTab from "@/shared/components/infraComponents/ICAppManager/components/ICAppManagerDetail/components/ICAppManagerDetailsTabs/ICAppManagerDetailsHistoryTab";
import ICAppManagerDetailsSummaryTab from "@/shared/components/infraComponents/ICAppManager/components/ICAppManagerDetail/components/ICAppManagerDetailsTabs/ICAppManagerDetailsSummaryTab";
import { Tabs, Text } from "@mantine/core";
import type {
	ICAppManagerAxiosApiFn,
	ICAppManagerHistoryRq,
	ICAppManagerHistoryRs,
	PaginationRs,
} from "../../../../index.types";
import { pluginDetailsEnum } from "../index.types";
import classes from "./index.module.css";

type Props = {
	summary: string | null;
	loading: boolean;
	name?: string;
	getPluginHistory: ICAppManagerAxiosApiFn<
		ICAppManagerHistoryRq,
		PaginationRs<ICAppManagerHistoryRs>
	>;
};

export default function ICAppManagerDetailsTabs(props: Props) {
	return (
		<Tabs
			defaultValue={pluginDetailsEnum.SUMMERY}
			classNames={{
				tab: classes.tab,
			}}
		>
			<Tabs.List>
				<Tabs.Tab value={pluginDetailsEnum.SUMMERY}>
					<Text size="1.125rem">{pluginDetailsEnum.SUMMERY}</Text>
				</Tabs.Tab>
				<Tabs.Tab value={pluginDetailsEnum.HISTORY}>
					<Text size="1.125rem">{pluginDetailsEnum.HISTORY}</Text>
				</Tabs.Tab>
			</Tabs.List>
			<Tabs.Panel value={pluginDetailsEnum.SUMMERY} pt={20}>
				<ICAppManagerDetailsSummaryTab
					summary={props.summary}
					loading={props.loading}
				/>
			</Tabs.Panel>
			<Tabs.Panel value={pluginDetailsEnum.HISTORY} pt={20}>
				<ICAppManagerDetailsHistoryTab
					name={props?.name as string}
					getPluginHistory={props.getPluginHistory}
				/>
			</Tabs.Panel>
		</Tabs>
	);
}
