import {
	MonoAppProductColor,
	MonoAppProductTypeShortName,
} from "@/shared/components/infraComponents/ICMonoMarket/components/ICMonoMarket/index.constants";
import type { MonoAppProductTypeEnum } from "@/shared/components/infraComponents/ICMonoMarket/components/ICMonoMarket/index.enum";
import { MonoWatchLogo } from "@/shared/icons/components/general";
import { Button } from "@mantine/core";
import { IconAward, IconBox } from "@tabler/icons-react";
import type { ReactNode } from "react";

export function getMonoMarketAppProductionButton(params: {
	size: "small" | "large";
	type: MonoAppProductTypeEnum;
}) {
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

export function getMonoAppIcon(params: {
	size: number;
	name: string;
}) {
	const icons: Record<string, ReactNode> = {
		MonoSuite: <MonoWatchLogo width={params.size} height={params.size} />,
	};
	return icons[params.name] || <IconBox size={params.size} />;
}
