"use client";

import dynamic from "next/dynamic";

const MantineBaseProvider = dynamic(() => import("./MantineBaseProvider"), {
	ssr: false,
});

export default MantineBaseProvider;
