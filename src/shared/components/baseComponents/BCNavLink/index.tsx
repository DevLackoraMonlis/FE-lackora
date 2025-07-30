import { NavLink, type NavLinkProps } from "@mantine/core";
import classes from "./index.module.css";

type Props = Omit<NavLinkProps, "classNames"> & {
	href?: string;
	onMouseEnter?: VoidFunction;
	onMouseLeave?: VoidFunction;
};

export default function BCNavLink(props: Props) {
	console.log(props);
	return (
		<NavLink
			{...props}
			classNames={{
				chevron: classes.chevron,
				label: classes.label,
				root: classes.root,
				section: classes.section,
			}}
		/>
	);
}
