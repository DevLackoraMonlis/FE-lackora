import { Paper } from "@mantine/core";
import { Box, Stack, Text } from "@mantine/core";
import { IconAt, IconMapPin, IconPhone, IconSun } from "@tabler/icons-react";

import classesContact from "./assets/ContactIcons.module.css";
import classesGetInTouch from "./assets/GetInTouch.module.css";
import bg from "./assets/login-bg-min.jpg";

interface ContactIconProps extends Omit<React.ComponentPropsWithoutRef<"div">, "title"> {
	icon: typeof IconSun;
	title: React.ReactNode;
	description: React.ReactNode;
}

function ContactIcon({ icon: Icon, title, description, ...others }: ContactIconProps) {
	return (
		<div className={classesContact.wrapper} {...others}>
			<Box mr="md">
				<Icon size={24} />
			</Box>

			<div>
				<Text size="xs" className={classesContact.title}>
					{title}
				</Text>
				<Text className={classesContact.description}>{description}</Text>
			</div>
		</div>
	);
}

const MOCKDATA = [
	{ title: "Email", description: "hello@mantine.dev", icon: IconAt },
	{ title: "Phone", description: "+49 (800) 335 35 35", icon: IconPhone },
	{ title: "Address", description: "844 Morris Park avenue", icon: IconMapPin },
	{ title: "Working hours", description: "8 a.m. – 11 p.m.", icon: IconSun },
];

function ContactIconsList() {
	const items = MOCKDATA.map((item) => <ContactIcon key={item.title} {...item} />);
	return <Stack>{items}</Stack>;
}

export default function BranchCard() {
	return (
		<Paper shadow="md" radius="lg">
			<div className={classesGetInTouch.wrapper}>
				<div className={classesGetInTouch.contacts} style={{ backgroundImage: `url(${bg.src})` }}>
					<Text fz="lg" fw="bold" mb={"lg"} c="white">
						Studio Westpark
					</Text>

					<ContactIconsList />
				</div>

				{/* <form className={classesGetInTouch.form} onSubmit={(event) => event.preventDefault()}>
          <Text fz="lg" fw={700} className={classesGetInTouch.title}>
            Get in touch
          </Text>

          <div className={classesGetInTouch.fields}>
            <SimpleGrid cols={{ base: 1, sm: 2 }}>
              <TextInput label="Your name" placeholder="Your name" />
              <TextInput label="Your email" placeholder="hello@mantine.dev" required />
            </SimpleGrid>

            <TextInput mt="md" label="Subject" placeholder="Subject" required />

            <Textarea
              mt="md"
              label="Your message"
              placeholder="Please include all relevant information"
              minRows={3}
            />

            <Group justify="flex-end" mt="md">
              <Button type="submit" className={classesGetInTouch.control}>
                Send message
              </Button>
            </Group>
          </div>
        </form> */}
			</div>
		</Paper>
	);
}
