import { Types } from "mongoose";
import { PropertyEntity } from "./PropertyEntity";

export interface AddressPropertyEntity {
    street?: string; // rua
    number?: string; // numero
    complement?: string; // complemento
    neighborhood?: string; // bairro
    city?: string; // cidade
    state?: string; // estado
    country?: string; // pais
    zipCode?: string; // cep
    property: (Types.ObjectId | PropertyEntity) // id da propriedade ou objeto
}