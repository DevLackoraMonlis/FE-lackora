import ICAppManagerDetailsActivatedLicense from "@/shared/components/infraComponents/ICAppManager/components/ICAppManagerDetail/components/ICAppManagerDetailsStatus/ICAppManagerDetailsActivatedLicense";
import ICAppManagerDetailsExpiredCommercial from "@/shared/components/infraComponents/ICAppManager/components/ICAppManagerDetail/components/ICAppManagerDetailsStatus/ICAppManagerDetailsExpiredCommercial";
import ICAppManagerDetailsExpiredLicenseSupport from "@/shared/components/infraComponents/ICAppManager/components/ICAppManagerDetail/components/ICAppManagerDetailsStatus/ICAppManagerDetailsExpiredLicenseSupport";
import ICAppManagerDetailsNotInstalledLicense from "@/shared/components/infraComponents/ICAppManager/components/ICAppManagerDetail/components/ICAppManagerDetailsStatus/ICAppManagerDetailsNotInstalledLicense";
import type { ICAppManagerBusinessTypeEnum } from "@/shared/components/infraComponents/ICAppManager/index.types";

type Props = {
	active: boolean;
	expireDate: string;
	isExpiredLicenseSupport: boolean;
	isExpiredCommercial: boolean;
	isInstalled: boolean;
	isNew: boolean;
	activationCode: string;
	onGetPlugin: () => void;
	pluginType: ICAppManagerBusinessTypeEnum;
};

export default function ICAppManagerDetailsStatus(props: Props) {
	const {
		active,
		expireDate,
		isExpiredLicenseSupport,
		isExpiredCommercial,
		isInstalled,
		isNew,
		activationCode,
		onGetPlugin,
		pluginType,
	} = props;
	const renderPluginStatus = () => {
		if (active && expireDate) {
			return (
				<ICAppManagerDetailsActivatedLicense
					pluginType={pluginType}
					expireDate={expireDate}
					activationCode={activationCode}
				/>
			);
		}
		if (!active && isExpiredLicenseSupport) {
			return <ICAppManagerDetailsExpiredLicenseSupport onGetPlugin={onGetPlugin} />;
		}
		if (!active && isExpiredCommercial) {
			return <ICAppManagerDetailsExpiredCommercial onGetPlugin={onGetPlugin} />;
		}
		if (!active || !isInstalled || isNew) {
			return <ICAppManagerDetailsNotInstalledLicense onGetPlugin={onGetPlugin} />;
		}
	};

	return renderPluginStatus();
}
