import TanStackGridComponent from "./index.component";
import TanStackGridNonVirtual from "./index.non-virtual.component";
import type { TanStackGridProps } from "./index.types";

export default function BCTanStackGrid<T extends Record<string, unknown>>(
	props: TanStackGridProps<T>,
) {
	if (!props.disableVirtualize) {
		return <TanStackGridComponent<T> {...props} />;
	}

	return <TanStackGridNonVirtual<T> {...props} />;
}
