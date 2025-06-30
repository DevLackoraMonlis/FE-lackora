import ICAppManagerIconWrapper from "@/shared/components/infraComponents/ICAppManager/components/Shared/ICAppManagerIconWrapper";
import { Box, Card, Flex, Grid, Skeleton, Text } from "@mantine/core";
import { IconAddressBook, IconCoin, IconHelpCircle, IconHexagons } from "@tabler/icons-react";
import type { ReactNode } from "react";
import type { ICAppManagerRs } from "../../../../index.types";
import classes from "./index.module.css";

type CardsType = {
	id: string;
	label: string;
	icon: ReactNode;
	value: string;
};

type Props = {
	data?: ICAppManagerRs;
	loading: boolean;
};

export default function ICAppManagerDetailsCards(props: Props) {
	const { data, loading } = props;
	const type = data?.type;

	const cards: CardsType[] = [
		{
			id: "1",
			label: "Pricing",
			icon: <ICAppManagerIconWrapper color="gray" icon={<IconCoin size={24} />} />,
			value: type || "-",
		},
		{
			id: "2",
			label: "Built By",
			icon: <ICAppManagerIconWrapper color="gray" icon={<IconAddressBook width={24} height={24} />} />,
			value: data?.buildBy || "-",
		},
		{
			id: "3",
			label: "Category",
			icon: <ICAppManagerIconWrapper color="gray" icon={<IconHexagons size={24} />} />,
			value: data?.category || "-",
		},
		{
			id: "4",
			label: "Resources",
			icon: <ICAppManagerIconWrapper color="gray" icon={<IconHelpCircle size={24} />} />,
			value: data?.resources || "-",
		},
	];

	return (
		<Grid>
			{cards.map((card) => (
				<Grid.Col key={card.id} span={3}>
					<Card px={12} py={8} withBorder className={classes.cardBox}>
						<Flex align="center" gap={16}>
							<Flex align="center" justify="center" w={40} h={40} className={classes.iconBox}>
								{card?.icon}
							</Flex>
							<Box>
								<Text className={classes.title} fw={400} size="xs">
									{card?.label}
								</Text>
								{loading ? (
									<Skeleton height={8} mt="sm" radius="xl" width="100%" />
								) : (
									<Text fw={700} size="md" className={classes.caption}>
										{card?.value || "-"}
									</Text>
								)}
							</Box>
						</Flex>
					</Card>
				</Grid.Col>
			))}
		</Grid>
	);
}
