import { ActionIcon, Flex } from "@mantine/core";
import { IconPencil, IconX } from "@tabler/icons-react";
import { useState } from "react";

import { getDynamicField } from "@/shared/components/baseComponents/BCDynamicField";
import BCPopoverConfirm from "@/shared/components/baseComponents/BCPopoverConfirm";

import type {
	DiscoveryAdapterConfigsRq,
	DiscoveryAdapterConfigurationRs,
	DiscoveryAdaptersField,
} from "../../../../index.types";

import NoneCredentialEditForm from "../NoneCredentialEdit";

type Props = DiscoveryAdapterConfigurationRs & {
	handleDeleteAdapterConfigurations: VoidFunction;
	handleEditAdapterConfigurations: (configs: DiscoveryAdapterConfigsRq[]) => void;
	fields: DiscoveryAdaptersField[];
	loading: boolean;
	showLabel: boolean;
};

const NoneCredentialAdaptersCard = ({ showLabel, id, configs, isActive, ...props }: Props) => {
	const [editMode, setEditMode] = useState(false);

	if (editMode) {
		return (
			<NoneCredentialEditForm {...{ id, configs, isActive, ...props }} onCancel={() => setEditMode(false)} />
		);
	}

	return (
		<Flex gap="xs" mt="2xs" align="center">
			<Flex align="center" gap="xs" w="100%">
				{props.fields.map((item) => {
					const { label, key, ...field } = item;
					const defaultValue = configs?.find(({ key: valueKey }) => key === valueKey)?.value;
					return getDynamicField({
						otherElementOptions: { withAsterisk: true, style: { flex: 1 } },
						...field,
						key,
						defaultValue,
						disabled: true,
						label: showLabel ? label : "",
					});
				})}
			</Flex>
			<Flex gap="xs" align="center" mt={showLabel ? "2lg" : ""}>
				{props.editable && (
					<ActionIcon
						onClick={() => setEditMode((perValue) => !perValue)}
						title="Edit"
						variant="subtle"
						size="lg"
						c="gray.8"
						bg="gray.2"
					>
						<IconPencil size={20} />
					</ActionIcon>
				)}
				<BCPopoverConfirm
					loading={props.loading}
					onConfirm={props.handleDeleteAdapterConfigurations}
					confirmBtnColor="red"
					confirmBtnText="Delete"
					message="Are you sure to delete gateway ?"
					renderProps={(onToggle) => (
						<ActionIcon onClick={onToggle} title="Delete" variant="subtle" c="gray.8" bg="gray.2" size="lg">
							<IconX size={20} />
						</ActionIcon>
					)}
				/>
			</Flex>
		</Flex>
	);
};

export default NoneCredentialAdaptersCard;
