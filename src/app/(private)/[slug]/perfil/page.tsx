"use client";

import { GeneralPage } from "@/components/profile/general/GeneralPage";
import { PrivacyPage } from "@/components/profile/privacy/PrivacyPage";
import { TabNavigation } from "@/components/TabNavigation/TabNavigation";
import { Wrapper } from "@/components/Wrapper";
import { parseCookie } from "@/helpers/cookies/authCookie";

import { profileStore } from "@/store/profile/profileStore";
import { Types } from "mongoose";
import { useEffect } from "react";

const ProfilePage = () => {
	const menuItems = [
		{ id: 1, label: "Informações Pessoais" },
		{ id: 2, label: "Privacidade e Segurança" },
	];
	const { selectedMenu, setSelectedMenu, findOne } = profileStore();
	useEffect(() => {
		(async () => {
			const userId = parseCookie()?._id as Types.ObjectId;
			await findOne(userId);
		})();
	}, []);
	return (
		<Wrapper title="PERFIL" className="my-0 mx-0">
			<TabNavigation
				selectedTitle={selectedMenu}
				setSelectedTitle={setSelectedMenu}
				menuItems={menuItems}
			/>
			{selectedMenu?.label === "Informações Pessoais" && <GeneralPage />}
			{selectedMenu?.label === "Privacidade e Segurança" && (
				<PrivacyPage />
			)}
		</Wrapper>
	);
};

export default ProfilePage;
