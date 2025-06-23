import ICAppManagerIconWrapper from "@/shared/components/infraComponents/ICAppManager/components/Shared/ICAppManagerIconWrapper";
import { IconBox } from "@tabler/icons-react";
import type { ReactNode } from "react";
import type { ICAppManagerIconType } from "../index.types";

type Props = {
	size?: number;
	color?: string;
	isNew?: boolean;
	isInstalled?: boolean;
	badgeIconSize?: number;
	wrapperSize?: number;
};

const useAppManagerIcon = (props: Props) => {
	const PLUGIN_ICON: Record<ICAppManagerIconType, ReactNode> = {
		test: (
			<ICAppManagerIconWrapper
				badgeIconSize={props.badgeIconSize}
				wrapperSize={props.wrapperSize}
				isNew={props?.isNew}
				isInstalled={props?.isInstalled}
				color={props?.color}
				icon={<IconBox height={props?.size || 64} width={props?.size || 64} />}
			/>
		),
	};
	return { PLUGIN_ICON };
};

export default useAppManagerIcon;
