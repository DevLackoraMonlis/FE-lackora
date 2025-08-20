import type { PaginationRq } from "@/http/end-points/GeneralService.types";

export const useUsersList = (params: PaginationRq) => {
	const userList = {
		data: {
			results: [
				{
					id: "uuid",
					name: "Hanna Müller",
					branch: "Studio Westpark",
					job: "Manager",
					phone: "+849177030059",
				},
			],
			total: 1,
			params,
		},
	};

	return { userList };
};
