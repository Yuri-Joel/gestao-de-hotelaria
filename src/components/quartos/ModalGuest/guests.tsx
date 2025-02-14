import { Types } from "mongoose";
export const guestsMockup = [
    {
      _id: new Types.ObjectId("64e5d1b2c5a4b8f0f9b2b9b2"),
      createdAt: new Date("2024-01-01T12:00:00Z"),
      updatedAt: new Date("2025-01-15T10:15:00Z"),
      fullName: "Yuri Silva",
      email: "yuri.silva@example.com",
      phone: "+55 11 98765-4321",
      lastHosting: new Date("2024-12-20T14:30:00Z"),
      notes: [
        {
          lastUpdate: new Date("2025-01-15T10:15:00Z"),
          message: "Ótimo hóspede, sempre educado."
        }
      ],
      property: new Types.ObjectId("65f23a45e4b0a1d2c7e3f123"),
      address: {
        street: "Rua das Flores",
        number: "123",
        complement: "Apt 101",
        neighborhood: "Jardim das Acácias",
        city: "São Paulo",
        state: "SP",
        country: "Brasil",
        zipCode: "01234-567"
      }
    },
    {
      _id: new Types.ObjectId("64e5d1b2c5a4b8f0f9b2b9b2"),
      createdAt: new Date("2024-01-01T12:00:00Z"),
      updatedAt: new Date("2025-01-15T10:15:00Z"),
      fullName: "Yuri Joel",
      email: "yuri.Joel@example.com",
      phone: "+55 11 98765-4321",
      lastHosting: new Date("2024-12-20T14:30:00Z"),
      notes: [
        {
          lastUpdate: new Date("2025-01-15T10:15:00Z"),
          message: "Ótimo hóspede, sempre educado."
        }
      ],
      property: new Types.ObjectId("65f23a45e4b0a1d2c7e3f123"),
      address: {
        street: "Rua das Flores",
        number: "123",
        complement: "Apt 101",
        neighborhood: "Jardim das Acácias",
        city: "São Paulo",
        state: "SP",
        country: "Brasil",
        zipCode: "01234-567"
      }
    },
    {
      _id: new Types.ObjectId("64e5d1b2c5a4b8f0f9b2b9b3"),
      createdAt: new Date("2024-02-15T09:30:00Z"),
      updatedAt: new Date("2025-01-11T09:00:00Z"),
      fullName: "Suzana Pereira",
      email: "suzana.pereira@example.com",
      phone: "+55 21 91234-5678",
      lastHosting: new Date("2025-01-10T18:45:00Z"),
      notes: [
        {
          lastUpdate: new Date("2025-01-11T09:00:00Z"),
          message: "Pediu café da manhã especial."
        }
      ],
      property: new Types.ObjectId("65f23a45e4b0a1d2c7e3f124"),
      address: {
        street: "Avenida Rio Branco",
        number: "456",
        complement: "Bloco B, 2º andar",
        neighborhood: "Centro",
        city: "Rio de Janeiro",
        state: "RJ",
        country: "Brasil",
        zipCode: "20040-021"
      }
    },
    {
      _id: new Types.ObjectId("64e5d1b2c5a4b8f0f9b2b9b4"),
      createdAt: new Date("2024-03-10T17:45:00Z"),
      updatedAt: new Date("2024-12-01T10:00:00Z"),
      fullName: "Yasmine da Luz",
      email: "yasmine.luz@example.com",
      phone: "+55 31 96543-2109",
      lastHosting: new Date("2024-11-30T20:00:00Z"),
      notes: [
        {
          lastUpdate: new Date("2024-12-01T10:00:00Z"),
          message: "Ficou no quarto premium."
        }
      ],
      property: new Types.ObjectId("65f23a45e4b0a1d2c7e3f125"),
      address: {
        street: "Rua das Palmeiras",
        number: "789",
        complement: "Cobertura",
        neighborhood: "Santo Antônio",
        city: "Belo Horizonte",
        state: "MG",
        country: "Brasil",
        zipCode: "30160-090"
      }
    },
    {
      _id: new Types.ObjectId("64e5d1b2c5a4b8f0f9b2b9b5"),
      createdAt: new Date("2024-07-22T14:00:00Z"),
      updatedAt: new Date("2025-01-06T12:30:00Z"),
      fullName: "Abraão Costa",
      email: "abraao.costa@example.com",
      phone: "+55 41 92345-6789",
      lastHosting: new Date("2025-01-05T16:00:00Z"),
      notes: [
        {
          lastUpdate: new Date("2025-01-06T12:30:00Z"),
          message: "Reclamou do chuveiro."
        }
      ],
      property: new Types.ObjectId("65f23a45e4b0a1d2c7e3f126"),
      address: {
        street: "Rua Curitiba",
        number: "321",
        complement: "Casa 2",
        neighborhood: "Batel",
        city: "Curitiba",
        state: "PR",
        country: "Brasil",
        zipCode: "80420-000"
      }
    },
    {
      _id: new Types.ObjectId("64e5d1b2c5a4b8f0f9b2b9b6"),
      createdAt: new Date("2024-11-05T17:45:00Z"),
      updatedAt: new Date("2024-12-11T08:00:00Z"),
      fullName: "Emerson Oliveira",
      email: "emerson.oliveira@example.com",
      phone: "+55 51 93456-7890",
      lastHosting: new Date("2024-12-10T22:15:00Z"),
      notes: [
        {
          lastUpdate: new Date("2024-12-11T08:00:00Z"),
          message: "Gostou da área de lazer."
        }
      ],
      property: new Types.ObjectId("65f23a45e4b0a1d2c7e3f127"),
      address: {
        street: "Rua dos Girassóis",
        number: "654",
        complement: "Casa 1",
        neighborhood: "Vila Nova",
        city: "Porto Alegre",
        state: "RS",
        country: "Brasil",
        zipCode: "90030-032"
      }
    },
    {
      _id: new Types.ObjectId("64e5d1b2c5a4b8f0f9b2b9b7"),
      createdAt: new Date("2024-10-20T13:30:00Z"),
      updatedAt: new Date("2024-12-06T10:30:00Z"),
      fullName: "Paulo Henrique",
      email: "paulo.henrique@example.com",
      phone: "+55 71 94567-8901",
      lastHosting: new Date("2024-12-05T14:00:00Z"),
      notes: [
        {
          lastUpdate: new Date("2024-12-06T10:30:00Z"),
          message: "Deixou um ótimo feedback."
        }
      ],
      property: new Types.ObjectId("65f23a45e4b0a1d2c7e3f128"),
      address: {
        street: "Avenida 7 de Setembro",
        number: "987",
        complement: "Andar 3, Sala 3",
        neighborhood: "Pituba",
        city: "Salvador",
        state: "BA",
        country: "Brasil",
        zipCode: "41940-080"
      }
    },
    {
      _id: new Types.ObjectId("64e5d1b2c5a4b8f0f9b2b9b8"),
      createdAt: new Date("2024-09-05T18:15:00Z"),
      updatedAt: new Date("2025-01-03T07:45:00Z"),
      fullName: "Nicolas Santos",
      email: "nicolas.santos@example.com",
      phone: "+55 81 95678-9012",
      lastHosting: new Date("2025-01-02T19:00:00Z"),
      notes: [
        {
          lastUpdate: new Date("2025-01-03T07:45:00Z"),
          message: "Trouxe um pet."
        }
      ],
      property: new Types.ObjectId("65f23a45e4b0a1d2c7e3f129"),
      address: {
        street: "Rua do Sol",
        number: "159",
        complement: "Apt 202",
        neighborhood: "Boa Viagem",
        city: "Recife",
        state: "PE",
        country: "Brasil",
        zipCode: "51020-020"
      }
    },
    {
      _id: new Types.ObjectId("64e5d1b2c5a4b8f0f9b2b9b9"),
      createdAt: new Date("2024-08-30T19:00:00Z"),
      updatedAt: new Date("2024-11-26T09:30:00Z"),
      fullName: "Jumper Ferreira",
      email: "jumper.ferreira@example.com",
      phone: "+55 91 96789-0123",
      lastHosting: new Date("2024-11-25T17:30:00Z"),
      notes: [
        {
          lastUpdate: new Date("2024-11-26T09:30:00Z"),
          message: "Preferiu pagar em dinheiro."
        }
      ],
      property: new Types.ObjectId("65f23a45e4b0a1d2c7e3f130"),
      address: {
        street: "Avenida Beira-Mar",
        number: "321",
        complement: "Loja 1",
        neighborhood: "Atalaia",
        city: "Aracaju",
        state: "SE",
        country: "Brasil",
        zipCode: "49032-010"
      }
    },
    {
      _id: new Types.ObjectId("64e5d1b2c5a4b8f0f9b2b9ba"),
      createdAt: new Date("2024-11-10T15:30:00Z"),
      updatedAt: new Date("2024-12-16T08:00:00Z"),
      fullName: "Eduarda Lima",
      email: "eduarda.lima@example.com",
      phone: "+55 61 97890-1234",
      lastHosting: new Date("2024-12-15T13:00:00Z"),
      notes: [
        {
          lastUpdate: new Date("2024-12-16T08:00:00Z"),
          message: "Solicitou late check-out."
        }
      ],
      property: new Types.ObjectId("65f23a45e4b0a1d2c7e3f131"),
      address: {
        street: "Quadra 2",
        number: "102",
        complement: "Bloco A",
        neighborhood: "Asa Sul",
        city: "Brasília",
        state: "DF",
        country: "Brasil",
        zipCode: "70330-060"
      }
    }
  ];
  
