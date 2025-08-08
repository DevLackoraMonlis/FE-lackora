import { AnimatePresence, motion } from "framer-motion";
import type { PropsWithChildren } from "react";

export default function ICAdvancedFilterMotionElement(
	props: PropsWithChildren<{
		showConditionalElement?: boolean;
		disableConditional?: boolean;
	}>,
) {
	if (props.disableConditional) {
		return (
			<AnimatePresence>
				<motion.div
					style={{
						width: "100%",
					}}
					key="box"
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: 20 }}
					transition={{ duration: 0.3 }}
					className="mt-4 p-6 bg-green-200 rounded shadow"
				>
					{props.children}
				</motion.div>
			</AnimatePresence>
		);
	}

	return (
		<AnimatePresence>
			{props.showConditionalElement && (
				<motion.div
					key="box"
					style={{ width: "100%" }}
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: 20 }}
					transition={{ duration: 0.3 }}
					className="mt-4 p-6 bg-green-200 rounded shadow"
				>
					{props.children}
				</motion.div>
			)}
		</AnimatePresence>
	);
}
