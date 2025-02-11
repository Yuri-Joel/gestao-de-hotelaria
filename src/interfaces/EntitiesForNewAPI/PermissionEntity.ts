export enum EnumPermissions {
    createProperty = "CREATE_PROPERTY", //  autoriza criar propriedade
    editProperty = "EDIT_PROPERTY", // autoriza editar propriedade
    deleteProperty = "DELETE_PROPERTY", // autoriza deletar propriedade
    viewProperty = "VIEW_PROPERTY", // autoriza ver propriedades
    manageUsers = "MANAGE_USERS", // autoriza gerenciar usuarios
    manageFinancial = "FINANCIAL_MANAGEMENT", // autoriza gerenciar area financeira
    manageUHs = "MANAGE_UHS", // autoriza gerenciar quartos
    reserveProperty = "RESERVE_PROPERTY", // autoriza gerenciar reservas da propriedade
    reservationCenter = "RESERVATION_CENTER", // autoriza gerenciar a central de reservas
}