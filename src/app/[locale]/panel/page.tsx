import ICPageWrapper from "@/shared/components/infraComponents/ICPageWrapper";

export default function page() {
	return (
		<ICPageWrapper
			description={"Description About Assets"}
			menuGroup={{
				title: "Assets",
				dynamicMenuGroup: [
					{
						label: "Assets",
						href: "#",
					},
					{
						label: "Another Module",
						href: "#",
					},
					{
						label: "Another Module2",
						href: "#",
					},
				],
			}}
			title={"Assets"}
		>
			Page
		</ICPageWrapper>
	);
}
