// NeonButton.tsx
import { Button, type ButtonProps, type PolymorphicComponentProps } from "@mantine/core";
import classes from "./index.module.css";

type NeonButtonProps = PolymorphicComponentProps<"button", ButtonProps> & {
	glowColor?: string;
};

export function NeonButton({ children, glowColor = "#6EA8FE", ...props }: NeonButtonProps) {
	return (
		<Button {...props} classNames={{ root: classes.root, label: classes.label }} variant="filled">
			{children}
		</Button>
	);
}
