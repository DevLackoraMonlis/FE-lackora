import {
	MonoAppProductColor,
	MonoAppProductTypeShortName,
} from "@/shared/components/infraComponents/ICMonoMarket/components/ICMonoMarket/index.constants";
import type {
	MonoAppProductTypeEnum,
	MonoAppStatusTypeEnum,
} from "@/shared/components/infraComponents/ICMonoMarket/components/ICMonoMarket/index.enum";
import type { MonoMarketCardProps } from "@/shared/components/infraComponents/ICMonoMarket/components/ICMonoMarket/index.types";
import { MonoWatchLogo } from "@/shared/icons/components/general";
import { Button, Tooltip } from "@mantine/core";
import { IconArrowNarrowRight, IconAward, IconBox, IconLock } from "@tabler/icons-react";
import type { ReactNode } from "react";

export function getMonoMarketAppProductionButton(params: {
	size: "small" | "large" | "xLarge";
	type: MonoAppProductTypeEnum;
}) {
	if (params.size === "xLarge") {
		return (
			<Button
				c={MonoAppProductColor[params.type]}
				variant={"light"}
				leftSection={<IconAward size={14} color={MonoAppProductColor[params.type]} />}
				size={"xs"}
			>
				{`PRODUCT LICENSE LEVEL: ${params.type} SECURITY`}
			</Button>
		);
	}
	return (
		<Button
			c={MonoAppProductColor[params.type]}
			variant={"light"}
			leftSection={<IconAward size={14} color={MonoAppProductColor[params.type]} />}
			size={params.size === "small" ? "compact-xs" : "sm"}
		>
			{params.size === "small" ? MonoAppProductTypeShortName[params.type] : params.type}
		</Button>
	);
}

export function getMonoMarketAppMonoCareLicenseButton(params: {
	size: "small" | "large";
}) {
	return (
		<Button
			c={"#15AABF"}
			variant={"light"}
			leftSection={<IconAward size={14} color={"#15AABF"} />}
			size={params.size === "small" ? "compact-xs" : "xs"}
		>
			{params.size === "small" ? "MC" : "MONOCARE REQUIRED"}
		</Button>
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
	} & Pick<
		MonoMarketCardProps,
		"isConfigured" | "productType" | "hasConfig" | "onActiveWithConfig" | "onActiveOnly"
	>,
) => {
	if (params.status === "EXPIRED" && params.productType === "STANDARD") {
		return (
			<Button size={"xs"} color={"red"}>
				Renew license
			</Button>
		);
	}

	if (params.status === "INACTIVE" && params.productType !== "STANDARD") {
		return (
			<Tooltip label={"Upgrade your license to activate this app"}>
				<Button disabled size={"xs"} rightSection={<IconLock color={"black"} size={16} />}>
					Unavailable
				</Button>
			</Tooltip>
		);
	}

	if (params.status === "ACTIVATED" && params.productType !== "STANDARD") {
		if (params.isConfigured) {
			return (
				<Button variant={"outline"} size={"xs"}>
					Open
				</Button>
			);
		}
		return (
			<Button
				onClick={params.hasConfig ? params.onActiveWithConfig : params.onActiveOnly}
				size={"xs"}
				rightSection={<IconArrowNarrowRight />}
			>
				{params.hasConfig ? "Configure & Active" : "Active App"}
			</Button>
		);
	}

	if (params.status === "ACTIVATED") {
		return (
			<Button variant={"outline"} size={"xs"}>
				Open
			</Button>
		);
	}

	return (
		<Button size={"xs"} color={"red"}>
			Renew license
		</Button>
	);
};
