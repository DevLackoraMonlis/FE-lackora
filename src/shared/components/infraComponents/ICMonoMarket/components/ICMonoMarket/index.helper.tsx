import {
	MonoAppProductColor,
	MonoAppProductTypeShortName,
} from "@/shared/components/infraComponents/ICMonoMarket/components/ICMonoMarket/index.constants";
import {
	type MonoAppProductTypeEnum,
	MonoAppStatusTypeEnum,
} from "@/shared/components/infraComponents/ICMonoMarket/components/ICMonoMarket/index.enum";
import type { MonoMarketCardProps } from "@/shared/components/infraComponents/ICMonoMarket/components/ICMonoMarket/index.types";
import { MonoWatchLogo } from "@/shared/icons/components/general";
import { Badge, Box, Button, Flex, Tooltip } from "@mantine/core";
import { IconArrowNarrowRight, IconAward, IconBox, IconLock, IconSettings } from "@tabler/icons-react";
import type { ReactNode } from "react";

export function getMonoMarketAppActivationStatusBadge(status: MonoAppStatusTypeEnum, withEmptyBox = false) {
	const badges: Record<MonoAppStatusTypeEnum, ReactNode> = {
		[MonoAppStatusTypeEnum.ACTIVATED]: (
			<Badge size={"lg"} radius={"xs"} variant={"light"} color={"#12B886"}>
				{status}
			</Badge>
		),
		[MonoAppStatusTypeEnum.EXPIRED]: (
			<Badge size={"lg"} radius={"xs"} variant={"light"} color={"#FA5252"}>
				{status}
			</Badge>
		),
		[MonoAppStatusTypeEnum.INACTIVE]: (
			<Badge size={"lg"} radius={"xs"} variant={"light"} color={"#868E96"}>
				{status}
			</Badge>
		),
		[MonoAppStatusTypeEnum.INSTALLING]: null,
	};

	return badges[status] || (withEmptyBox ? <Box /> : null);
}

export function getMonoMarketAppProductButton(params: {
	size: "small" | "large" | "xLarge";
	type: MonoAppProductTypeEnum;
}) {
	if (params.size === "xLarge") {
		return (
			<Badge
				tt={"capitalize"}
				fz={"2xs"}
				radius={"xs"}
				variant={"light"}
				color={MonoAppProductColor[params.type]}
				leftSection={<IconAward size={14} color={MonoAppProductColor[params.type]} />}
				size={"lg"}
			>
				{`PRODUCT LICENSE LEVEL: ${params.type} SECURITY`}
			</Badge>
		);
	}
	return (
		<Badge
			classNames={{
				label: "pl-1-5",
			}}
			fz={"2xs"}
			radius={"xs"}
			color={MonoAppProductColor[params.type]}
			variant={"light"}
			leftSection={<IconAward size={14} color={MonoAppProductColor[params.type]} />}
			size={"lg"}
		>
			{params.size === "small" ? MonoAppProductTypeShortName[params.type] : params.type}
		</Badge>
	);
}

export function getMonoMarketAppMonoCareLicenseButton(params: {
	size: "small" | "large";
}) {
	return (
		<Badge
			fz={"2xs"}
			radius={"xs"}
			color={"#15AABF"}
			variant={"light"}
			leftSection={<IconAward size={14} color={"#15AABF"} />}
			size={"lg"}
		>
			{params.size === "small" ? "MC" : "MONOCARE REQUIRED"}
		</Badge>
	);
}

export function getMonoAppIcon(params: {
	size: number;
	name: string;
}) {
	const icons: Record<string, ReactNode> = {
		MonoSuite: <MonoWatchLogo width={params.size} height={params.size} />,
	};
	return icons[params.name] || <IconBox size={params.size} />;
}

export const getMonoMarketActivateConfigButton = (
	params: {
		status: MonoAppStatusTypeEnum;
		showConfigButton: boolean;
		onConfig?: VoidFunction;
		onOpen: VoidFunction;
		isAvailable: boolean;
		hasSupportLicenseSupport: boolean;
	} & Pick<
		MonoMarketCardProps,
		"isConfigured" | "productType" | "configRequired" | "onActiveWithConfig" | "onActiveOnly"
	>,
) => {
	if (params.status === MonoAppStatusTypeEnum.EXPIRED && params.hasSupportLicenseSupport) {
		return (
			<Button size={"xs"} color={"red"}>
				Renew license
			</Button>
		);
	}

	if (!params.isAvailable) {
		return (
			<Tooltip label={"Upgrade your license to activate this app"}>
				<Button disabled size={"xs"} rightSection={<IconLock color={"black"} size={16} />}>
					Unavailable
				</Button>
			</Tooltip>
		);
	}

	if (params.status === "INACTIVE" && params.configRequired) {
		return (
			<Button onClick={params.onActiveWithConfig} size={"xs"} rightSection={<IconArrowNarrowRight />}>
				{"Configure & Active"}
			</Button>
		);
	}

	if (params.status === "INACTIVE" && !params.configRequired) {
		return (
			<Button onClick={params.onActiveOnly} size={"xs"} rightSection={<IconArrowNarrowRight />}>
				{"Active App"}
			</Button>
		);
	}

	if (params.status === "ACTIVATED") {
		return (
			<Flex gap={"2xs"} align={"center"}>
				<Button onClick={params.onOpen} variant={"outline"} size={"xs"}>
					Open
				</Button>
				{params.showConfigButton && params.isConfigured && (
					<Button onClick={params.onConfig} variant={"default"}>
						<IconSettings />
					</Button>
				)}
			</Flex>
		);
	}

	return null;
};
