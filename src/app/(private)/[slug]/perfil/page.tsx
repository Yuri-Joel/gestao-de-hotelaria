"use client";

import { GeneralPage } from "@/components/profile/general/GeneralPage";
import PrivacyPage from "@/components/profile/privacy/PrivacyPage";
import { TabNavigation } from "@/components/TabNavigation/TabNavigation";
import { Wrapper } from "@/components/Wrapper";

import { useProfileStore } from "@/store/profile/profileStore";

const ProfilePage = () => {
	const menuItems = [
		{ id: 1, label: "Informações Pessoais" },
		{ id: 2, label: "Privacidade e Segurança" },
	];
	const { selectedMenu, setSelectedMenu } = useProfileStore();
	
	return (
		<Wrapper title="PERFIL" className="my-0 mx-0">
			<TabNavigation
				selectedTitle={selectedMenu}
				setSelectedTitle={setSelectedMenu}
				menuItems={menuItems}
			/>
			{selectedMenu === "Informações Pessoais" && <GeneralPage />}
			{selectedMenu === "Privacidade e Segurança" && <PrivacyPage />}
		</Wrapper>
	);
};

export default ProfilePage;
