import type { CreateConnectionHTTPProtocolType } from "@/builtinApps/ObjectsApp/Connections/index.enum";
import type { CreateConnectionDefaultFormValues } from "@/builtinApps/ObjectsApp/Connections/index.types";
import { createFormContext } from "@mantine/form";

export type CreateConnectionHTTPFormValues = CreateConnectionDefaultFormValues<{
	baseUri: string;
	protocol: CreateConnectionHTTPProtocolType;
	port: number;
	authenticationRequired: boolean;
	username?: string;
	password?: string;
}>;

export const [
	CreateConnectionHTTPFormProvider,
	useCreateConnectionHTTPFormContext,
	useCreateConnectionHTTPForm,
] = createFormContext<CreateConnectionHTTPFormValues>();
