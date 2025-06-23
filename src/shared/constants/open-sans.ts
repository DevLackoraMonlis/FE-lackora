import localFont from "next/font/local";

export const openSans = localFont({
	variable: "--open-sans",
	src: [
		{
			path: "../../../public/fonts/open-sans/OpenSans-Bold.woff",
			weight: "bold",
		},
		{
			path: "../../../public/fonts/open-sans/OpenSans-BoldItalic.woff",
			weight: "bold",
			style: "italic",
		},
		{
			path: "../../../public/fonts/open-sans/OpenSans-ExtraBold.woff",
			weight: "900",
		},
		{
			path: "../../../public/fonts/open-sans/OpenSans-Italic.woff",
			style: "italic",
		},
		{
			path: "../../../public/fonts/open-sans/OpenSans-Light.woff",
			weight: "200",
		},
		{
			path: "../../../public/fonts/open-sans/OpenSans-Regular.woff",
			weight: "normal",
		},
	],
});
