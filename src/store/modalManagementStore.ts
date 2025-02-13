
import { create } from 'zustand'

type State = {
    isOpenedAlertDialogConfirmLogout: boolean
}

type Action = {
    handleOpenAlertDialogConfirmLogout: () => void  
}

export const modalManagementStore = create<State & Action>((set, get) => ({
        isOpenedAlertDialogConfirmLogout: false,
        handleOpenAlertDialogConfirmLogout: () => {
            const isOpened = get().isOpenedAlertDialogConfirmLogout
            set({ isOpenedAlertDialogConfirmLogout: !isOpened })
        }
    }),
)
