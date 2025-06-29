import { Flex, List, ScrollArea, Text } from "@mantine/core";

export default function ICLicenseAgreementEnContent() {
	return (
		<Flex direction="column" p="xl">
			<ScrollArea.Autosize type="hover" mah={690}>
				<Text size="sm">
					Please read the following legal agreement carefully before using the CoreLog software product. This
					agreement is made between Behin Rahkar Company and the user of this software. In this agreement, the
					term Company refers to Behin Rahkar Company, and the User refers to the individual who uses the
					software. By reading this agreement, you acknowledge all its terms and conditions and agree to be
					bound by them. If you do not agree with all the terms and conditions of this agreement, do not use
					the software; otherwise, you will have the right to use the software according to the terms and
					limitations of this agreement.
				</Text>
				<List type="ordered" mt="xl" w="93%">
					<List.Item>
						<Text size="md" fw="bolder">
							Ownership Rights
						</Text>
						<List type="ordered">
							<List.Item>
								The ownership of the software, along with all material and intellectual rights, and its
								benefits and documentation, belongs entirely to the Company and is subject to all copyright
								protection laws. Any violation of these rights will be subject to the criminal and civil
								enforcement measures provided by law. Installing and using the software does not grant you any
								ownership rights, and you only have the rights explicitly stated in this agreement.
							</List.Item>
							<List.Item mt="xs">
								You agree not to modify the software in any way. You may not alter or delete any part of the
								software, including programs, documentation, messages, etc.
								<List type="ordered">
									<List.Item>
										<Text size="md" fw="bolder">
											Clause 1:
										</Text>
										<Text>The Company is entirely free to make changes in new editions and versions.</Text>
									</List.Item>
									<List.Item>
										<Text size="md" fw="bolder">
											Clause 2:
										</Text>
										<Text>
											Due to reported bug fixes and technological changes, the user must personally follow up
											on the release of new versions and continuously update the software to the latest
											editions and versions, as well as renew annual support.
										</Text>
									</List.Item>
									<List.Item>
										<Text size="md" fw="bolder">
											Clause 3:
										</Text>
										<Text>
											Receiving free updates during the support period applies to the same version updates,
											and if a new version of the product is produced, this update will not be included.
										</Text>
									</List.Item>
								</List>
							</List.Item>
						</List>
					</List.Item>
					<List.Item mt="md">
						<Text size="md" fw="bolder">
							General Provisions
						</Text>
						<List type="ordered">
							<List.Item>
								Any updates and upgrades are considered part of the software product and are subject to the
								general terms and conditions outlined in this agreement.
							</List.Item>
							<List.Item mt="xs">
								If you violate any of the terms and conditions of this agreement, the Company has the right to
								revoke your software license.
							</List.Item>
							<List.Item mt="xs">
								You agree to comply with all applicable international and national laws (including but not
								limited to confidentiality, intellectual property, and ethical laws) when using this software
								or any reports and information obtained as a result of using this software.
							</List.Item>
							<List.Item mt="xs">
								Except as explicitly stated in this text, you may not transfer or assign any of the rights
								granted to you under this agreement or any of the obligations imposed on you by this agreement
								to anyone else.
							</List.Item>
							<List.Item mt="xs">
								The user is committed to maintaining the confidentiality of their password and account
								information and is responsible for all operations conducted through their account. In the
								event of security incidents, including (but not limited to) password compromise or
								unauthorized account use, the user must promptly notify the Company.
							</List.Item>
						</List>
					</List.Item>
					<List.Item mt="md">
						<Text size="md" fw="bolder">
							Usage Restrictions
						</Text>
						<List type="ordered">
							<List.Item>
								Any unauthorized and illegal use, under any title, including but not limited to (copying the
								software or its documentation, modifying the software or adapting it or integrating it with
								other software, reverse engineering, decompiling, or any attempt to discover the software
								code, placing the software on a server so that it is accessible through public networks (such
								as the internet) or communication devices, renting or making the software available to the
								public in whole or in part, or distributing the software in any form) is prohibited.
							</List.Item>
							<List.Item mt="xs">
								The software contains a rule (virtual machine) called the Identity Gateway, which is
								responsible for the authentication of various system components. If any unauthorized access or
								even an attempt to gain unauthorized access to this rule occurs, the system and the licenses
								on all its components may be disrupted, and in many cases, this can lead to the complete
								shutdown of the software.
							</List.Item>
							<List.Item mt="xs">
								In the software, each rule (virtual machine) must establish the necessary network and
								application communication with the Identity Gateway for proper functioning. If any disruption
								in network communications between any rule and the Identity Gateway occurs, it can cause the
								complete shutdown of the software. Additionally, any unauthorized access or even an attempt to
								gain unauthorized access to any of the software&apos;s rules can result in the complete
								shutdown of the software.
							</List.Item>
							<List.Item mt="xs">
								All software rules (virtual machines) must be deployed on the organization&apos;s virtual
								infrastructure through the deployment of the reference OVA provided by Behin Rahkar Company.
								If any other method, including but not limited to (cloning virtual machines, registering VMDK
								files, etc.), is attempted for deployment, it can result in the complete shutdown of the
								software and its license.
							</List.Item>
							<List.Item mt="xs">
								If any of the software&apos;s rules (virtual machines) are rendered inoperative due to
								unauthorized access or attempts, it will directly affect the license placed on all software
								rules. In such a case, the licenses cannot be recovered, and the user must repurchase the
								software license.
							</List.Item>
							<List.Item mt="xs">
								If the user violates the provisions of this article or other obligations arising from this
								agreement, they will be responsible for compensating all material and immaterial, direct or
								indirect damages incurred by the Company.
							</List.Item>
							<List.Item mt="xs">
								The software subject to this agreement contains the Company&apos;s trade secrets and specific
								information, and any use or disclosure of the mentioned information and secrets will be
								considered a violation of trade secret rights and will be prosecutable.
							</List.Item>
							<List.Item mt="xs">You may not rent, lend, or lease the software to another person.</List.Item>
						</List>
					</List.Item>
					<List.Item mt="md">
						<Text size="md" fw="bolder">
							Limited Warranty and Disclaimer
						</Text>
						<List type="ordered">
							<List.Item>
								The Company guarantees that the software will substantially operate according to the
								specifications and descriptions provided in the documentation. However, this limited warranty
								does not apply in the following cases: (a.) Defects in your device and related violations for
								which the Company expressly disclaims any warranty liability; (b.) Misuse, defects, or failure
								due to improper use, abuse, accident, negligence, installation, inappropriate operation and
								maintenance, theft, sabotage, natural disasters, power failure, accident, fluctuations,
								unauthorized changes, or repair by anyone other than individuals designated by the Company, or
								actions by you or reasons beyond the Company&apos;s control; (c.) Any failure caused by you
								after the initial failure; (d.) Incompatibility caused by the components of your device&apos;s
								hardware and/or software.
							</List.Item>
							<List.Item mt="xs">
								You acknowledge that no software is free of errors, and it is recommended that you regularly
								back up your device at appropriate intervals.
							</List.Item>
							<List.Item mt="xs">
								The Company does not guarantee that the software will work correctly if the specified
								conditions are violated.
							</List.Item>
							<List.Item mt="xs">
								The Company does not guarantee that the software will function correctly if you do not
								regularly perform the updates and upgrades specified in this agreement.
							</List.Item>
							<List.Item mt="xs">
								You agree that the software comes with the default standard settings applied, and it is your
								responsibility to configure the software to meet your requirements.
							</List.Item>
							<List.Item mt="xs">
								The Company provides no warranty, condition, claim, or provision (express or implied,
								statutory, common law, usage, custom, or otherwise) for any matter, including (but not limited
								to) non-infringement of third-party rights, merchantability, satisfactory quality,
								partnership, or fitness for a general purpose. You assume all risks of error and
								responsibility for the performance and selection of the software to achieve your purposes, as
								well as for the installation, use, and results obtained from the software.
							</List.Item>
							<List.Item mt="xs">
								Notwithstanding the terms and conditions of this agreement, the Company does not guarantee
								that the software will be error-free, uninterrupted, or free of other failures, or that it
								will meet some or all of your needs, whether communicated to the Company or not.
							</List.Item>
						</List>
					</List.Item>
					<List.Item mt="md">
						<Text size="md" fw="bolder">
							Limitation of Liability
						</Text>
						<List type="ordered">
							<List.Item>
								To the maximum extent permitted by applicable law, under no circumstances shall the Company or
								its partners be liable for any loss, whether it is special, incidental, punitive, indirect,
								consequential, or otherwise (including damages resulting from lost profits or confidential
								information or other data, work suspension, loss of confidentiality, corruption, damage, or
								loss of data or programs, failure to perform duties including legal duties, moral duties, or
								proper maintenance duties, negligence, economic loss, and any other financial loss), and due
								to any usage or inability to use the software, law failure, support failure or other services,
								information, software, and matters related to the software or its use, under or related to any
								law with any provision in this agreement or breach of contract or any crime (including
								negligence, false representation), any liability obligation, or duty (or any violation of the
								law or any warranty breach by the Company or any of its partners even if the Company or its
								partners have been warned about the possibility of such failure). You agree that in
								circumstances where the Company and its partners are liable, their liability is limited to the
								value of the software. In no event shall their liability exceed the amount paid for the
								software. This agreement is governed in all respects by the regulations of the Islamic
								Republic of Iran, including the Law on the Protection of the Rights of Computer Software
								Creators, approved in 2000, and its executive regulations. In case of any dispute regarding
								the interpretation or implementation of the provisions of this agreement, the Disciplinary
								Council of the Tehran Computer Guild Organization shall be selected as the mutually agreed
								arbitrator. In case of a dispute, the matter will first be reviewed by the Company&apos;s
								Complaint Handling Committee with the presence of both parties, and if no result is achieved,
								it will be referred to the arbitrator. If the arbitration result is not accepted, it will be
								subject to trial and hearing in the public courts of Tehran.
							</List.Item>
						</List>
					</List.Item>
				</List>
			</ScrollArea.Autosize>
		</Flex>
	);
}
