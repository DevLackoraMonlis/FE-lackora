import { Card, Container, type Direction, Flex } from "@mantine/core";
import { useState } from "react";
import ICLicenseAgreementEnContent from "./components/ICLicenseAgreementEnContent";
import ICLicenseAgreementFaContent from "./components/ICLicenseAgreementFaContent";
import ICLicenseAgreementFooter from "./components/ICLicenseAgreementFooter";
import ICLicenseAgreementHeader from "./components/ICLicenseAgreementHeader";
import classes from "./index.module.css";

export default function ICLicenseAgreement() {
	const [direction, setDirection] = useState<Direction>("ltr");

	return (
		<Flex direction="column" dir={direction}>
			<Container className={classes.container}>
				<Card withBorder shadow="xl" className={classes.card} h="95vh">
					<ICLicenseAgreementHeader setDirection={setDirection} direction={direction} />
					{direction === "rtl" ? <ICLicenseAgreementFaContent /> : <ICLicenseAgreementEnContent />}
					<ICLicenseAgreementFooter direction={direction} />
				</Card>
			</Container>
		</Flex>
	);
}
