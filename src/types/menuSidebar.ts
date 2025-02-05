export type TmenuSidebar = {
    label: string
    path: string 
    IconLeft?: React.ElementType
    IconRight?: React.ElementType
    iconClass: string
    subMenu?: {
      label: string
      path: string
    }[]
  }[]
  