
import { create } from 'zustand'

type State = {
    isOpenedAlertDialogConfirmLogout: boolean
    showModal: boolean
}

type Action = {
    handleOpenAlertDialogConfirmLogout: () => void
    setShowModal: (arg: boolean) => void
  
}

export const modalManagementStore = create<State & Action>((set, get) => ({
        isOpenedAlertDialogConfirmLogout: false,
        showModal: false,
        handleOpenAlertDialogConfirmLogout: () => {
            const isOpened = get().isOpenedAlertDialogConfirmLogout
            set({ isOpenedAlertDialogConfirmLogout: !isOpened })
        },
        setShowModal: (arg: boolean) => {
            set({ showModal: arg})
        }

    }),
)
