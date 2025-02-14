
import { create } from 'zustand'

type State = {
    isOpenedAlertDialogConfirmLogout: boolean
    isOpenedModalNewUh: boolean
    isOpenedModalEditUh: boolean
    isOpenedModalDeleteUh: boolean
}

type Action = {
    handleOpenAlertDialogConfirmLogout: () => void  
    handleOpenModalNewUh: () => void
    handleOpenModalEditUh: () => void
    handleOpenModalDeleteUh: () => void
}

export const modalManagementStore = create<State & Action>((set, get) => ({
        isOpenedAlertDialogConfirmLogout: false,
        isOpenedModalNewUh: false,
        isOpenedModalDeleteUh: false,
        isOpenedModalEditUh: false,
        handleOpenAlertDialogConfirmLogout: () => {
            const isOpened = get().isOpenedAlertDialogConfirmLogout
            set({ isOpenedAlertDialogConfirmLogout: !isOpened })
        },

        handleOpenModalNewUh: () => {
            const isOpened = get().isOpenedModalNewUh
            set({ isOpenedModalNewUh: !isOpened })
        },
        handleOpenModalDeleteUh: () => {
            const isOpened = get().isOpenedModalDeleteUh
            set({ isOpenedModalDeleteUh: !isOpened })
        },
        handleOpenModalEditUh: () => {
            const isOpened = get().isOpenedModalEditUh
            set({ isOpenedModalEditUh: !isOpened })
        }

    }),
)
