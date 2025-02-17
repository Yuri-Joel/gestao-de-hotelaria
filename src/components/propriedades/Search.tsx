// 'use client'
// import { propertyStore } from "@/store/propertyStore";
// import { Input } from "../Input/Input";
// import { PropertyEntity } from "@/interfaces/EntitiesForNewAPI/PropertyEntity";

// interface SearchProps {
//   data: PropertyEntity[] | null;
//   setSearchData: (value: PropertyEntity[]) => void;
//   searchInput: string;
//   setSearchInput: (value: string) => void;
//   setCurrentPage: (value: number) => void;
// }


// export function Search({ data, setSearchData, searchInput, setSearchInput, setCurrentPage }: SearchProps) {

//   const { setPropertyPerPage } = propertyStore()
//   const searchFilter = (textInput: React.ChangeEvent<HTMLInputElement>) => {
//     const text = textInput.target.value.toString()
    
//   if (!text && data) {
//     setSearchData(data);
//     setSearchInput(text);
//     return;
//   }

//   let filteredData = [...(data || [])].filter((item) => 
//     item.name.toLowerCase().includes(text)
//   );

//   // Se não encontrar pelo nome, busca pelo ID
//   if (filteredData.length === 0) {
//     filteredData = [...(data || [])].filter((item) => 
//       String(item._id).includes(text)
//     );
//   }

//   setSearchData(filteredData);
//   setSearchInput(text);
//   setPropertyPerPage(10);
//   setCurrentPage(1);
// }

//   return(
//     <div className="flex flex-col items-start">
//       <div className="w-[300px] space-y-4">
//         <h1 className="font-semibold">Todas as Propriedades</h1>
//         <Input
//           value={searchInput}
//           placeholder="Nome ou ID da propriedade"
//           handleValue={searchFilter}
//         />          
//       </div>
//         <div className="bg-black h-[1.5px] w-full mt-12"></div>
//     </div>
//   )
// }