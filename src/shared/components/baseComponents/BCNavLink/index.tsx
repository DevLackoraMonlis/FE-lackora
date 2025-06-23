import { NavLink, type NavLinkProps } from "@mantine/core";
import classes from "./index.module.css";

type Props = Omit<NavLinkProps, "classNames"> & { href?: string };

export default function BCNavLink(props: Props) {
	return (
		<NavLink
			{...props}
			classNames={{
				chevron: classes.chevron,
				label: classes.label,
				root: classes.root,
			}}
		/>
	);
}
