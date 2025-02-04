'use client'
import { Input } from "../Input/Input";
import { Properties } from "@/interfaces/Properties";

interface SearchProps {
  data: Properties[];
  searchData: Properties[];
  setSearchData: (value: Properties[]) => void;
  searchInput: string;
  setSearchInput: (value: string) => void;
  setPage: (value: number) => void;
  setManyProperties: (value: number) => void
}


export function Search({ data, searchData, setSearchData, searchInput, setSearchInput, setPage, setManyProperties }: SearchProps) {

  const searchFilter = (textInput: React.ChangeEvent<HTMLInputElement>) => {
    const text = textInput.target.value.toString()
    
  if (!text) {
    setSearchData(data);
    setSearchInput(text);
    return;
  }

  let filteredData = searchData.filter((item) => 
    item.name.toLowerCase().includes(text)
  );

  // Se não encontrar pelo nome, busca pelo ID
  if (filteredData.length === 0) {
    filteredData = searchData.filter((item) => 
      String(item.id).includes(text)
    );
  }

  setSearchData(filteredData);
  setSearchInput(text);
  setManyProperties(10);
  setPage(1);
}

  return(
    <div className="flex flex-col items-start">
      <div className="w-[300px] space-y-4">
        <h1 className="font-semibold">Todas as Propriedades</h1>
        <Input
          value={searchInput}
          placeholder="Nome ou ID da propriedade"
          handleValue={searchFilter}
          className="h-12"
        />          
      </div>
        <div className="bg-black h-[1.5px] w-full mt-12"></div>
    </div>
  )
}