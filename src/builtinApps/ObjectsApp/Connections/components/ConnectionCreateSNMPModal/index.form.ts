import type {
	CreateConnectionSNMPAuthenticationProtocolType,
	CreateConnectionSNMPPrivacyProtocolType,
	CreateConnectionSNMPSecurityLdLevelType,
	CreateConnectionSNMPVersionType,
} from "@/builtinApps/ObjectsApp/Connections/index.enum";
import type { CreateConnectionDefaultFormValues } from "@/builtinApps/ObjectsApp/Connections/index.types";
import { createFormContext } from "@mantine/form";

export type CreateConnectionSNMPFormValues = CreateConnectionDefaultFormValues<{
	snmpPort: number;
	community?: string;
	snmpVersion: CreateConnectionSNMPVersionType;
	securityLevel?: CreateConnectionSNMPSecurityLdLevelType;
	user?: string;
	password?: string;
	authenticationProtocol?: CreateConnectionSNMPAuthenticationProtocolType;
	privacyProtocol?: CreateConnectionSNMPPrivacyProtocolType;
	privacyPassphrase?: string;
}>;

export const [
	CreateConnectionSNMPFormProvider,
	useCreateConnectionSNMPFormContext,
	useCreateConnectionSNMPForm,
] = createFormContext<CreateConnectionSNMPFormValues>();
