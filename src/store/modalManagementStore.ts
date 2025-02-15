
import { create } from 'zustand'

type State = {
    isOpenedAlertDialogConfirmLogout: boolean
    
    isOpenedModalNewUh: boolean
    isOpenedModalEditUh: boolean
    isOpenedModalDeleteUh: boolean

    isOpenedModalNewfloor: boolean
    isOpenedModalEditfloor: boolean
    isOpenedModalDeletefloor: boolean
}

type Action = {
    handleOpenAlertDialogConfirmLogout: () => void  
    handleOpenModalNewUh: () => void
    handleOpenModalEditUh: () => void
    handleOpenModalDeleteUh: () => void

    handleOpenModalNewfloor: () => void
    handleOpenModalEditfloor: () => void
    handleOpenModalDeletefloor: () => void
}

export const modalManagementStore = create<State & Action>((set, get) => ({
        isOpenedAlertDialogConfirmLogout: false,
        isOpenedModalNewUh: false,
        isOpenedModalDeleteUh: false,
        isOpenedModalEditUh: false,

        isOpenedModalNewfloor: false,
        isOpenedModalDeletefloor: false,
        isOpenedModalEditfloor: false,
        
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
        },
        handleOpenModalNewfloor: () => {
            const isOpened = get().isOpenedModalNewfloor
            set({ isOpenedModalNewfloor: !isOpened })
        },
        handleOpenModalDeletefloor: () => {
            const isOpened = get().isOpenedModalDeletefloor
            set({ isOpenedModalDeletefloor: !isOpened })
        },
        handleOpenModalEditfloor: () => {
            const isOpened = get().isOpenedModalEditfloor
            set({ isOpenedModalEditfloor: !isOpened })
        }

    }),
)
