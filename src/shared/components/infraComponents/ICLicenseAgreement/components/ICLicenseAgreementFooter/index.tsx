import { AppRoutes } from "@/shared/constants/routes";
import { Button, Checkbox, Flex } from "@mantine/core";
import type { Direction } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useState } from "react";
import classes from "../../index.module.css";

type Props = {
	direction: Direction;
};

export default function ICLicenseAgreementFooters(props: Props) {
	const router = useRouter();
	const [aggregated, setAggregated] = useState<boolean>(false);

	const handlerAcceptAgreement = () => {
		router.push(AppRoutes.updatePassword);
	};

	return (
		<Flex
			left={0}
			justify="space-between"
			align="center"
			right={0}
			pos="absolute"
			bottom={0}
			className={classes.footer}
			p={16}
		>
			<Checkbox
				checked={aggregated}
				onChange={(event) => setAggregated(event.currentTarget.checked)}
				label={
					props.direction === "rtl"
						? "من شرایط قرارداد مجوز را خوانده ام و با آن موافقم"
						: "I have read and agree to the terms of the licenses agreement"
				}
			/>
			<Button disabled={!aggregated} onClick={handlerAcceptAgreement} w="20%">
				{props.direction === "rtl" ? "ادامه" : "Continue"}
			</Button>
		</Flex>
	);
}
