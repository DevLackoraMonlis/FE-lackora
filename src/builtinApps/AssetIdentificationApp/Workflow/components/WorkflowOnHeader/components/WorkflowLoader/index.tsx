import type { MantineLoaderComponent } from "@mantine/core";
import { IconHourglassEmpty, IconLoader } from "@tabler/icons-react";
import cx from "clsx";
import { forwardRef } from "react";

import classes from "./index.module.css";

export const WorkflowLoader: MantineLoaderComponent = forwardRef(({ className, ...others }, ref) => {
	return <IconLoader className={cx(classes.loader, className)} {...others} ref={ref} />;
});

export const WorkflowPending: MantineLoaderComponent = forwardRef(({ className, ...others }, ref) => {
	return <IconHourglassEmpty className={cx(classes.loader, className)} {...others} ref={ref} />;
});
