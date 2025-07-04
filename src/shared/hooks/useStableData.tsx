import isEqual from "lodash/isEqual";
import { useMemo, useRef } from "react";

export function useStableData<T>(data: T | undefined | null): T | undefined {
	const cachedRef = useRef<T | undefined>(undefined);

	return useMemo(() => {
		if (data && !isEqual(data, cachedRef.current)) {
			cachedRef.current = data;
		}
		return cachedRef.current;
	}, [data]);
}
