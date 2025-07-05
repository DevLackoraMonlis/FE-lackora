import type { CreateConnectionSSHAuthenticationType } from "@/builtinApps/ObjectsApp/Connections/index.enum";
import type { CreateConnectionDefaultFormValues } from "@/builtinApps/ObjectsApp/Connections/index.types";
import { createFormContext } from "@mantine/form";

export type CreateConnectionSSHFormValues = CreateConnectionDefaultFormValues<{
	sshPort: number;
	authenticationType: CreateConnectionSSHAuthenticationType;
	sshKey?: string;
	passphrase?: string;
	enablePrivilegedMode: boolean;
	username?: string;
	password?: string;
	privilegedPassword?: string;
}>;

export const [
	CreateConnectionSSHFormProvider,
	useCreateConnectionSSHFormContext,
	useCreateConnectionSSHForm,
] = createFormContext<CreateConnectionSSHFormValues>();
