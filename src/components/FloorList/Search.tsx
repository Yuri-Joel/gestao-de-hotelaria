'use client'
import { useFloorListStore } from "@/store/FloorListStore";
import { Input } from "../Input/Input";
import { FloorListEntity } from "@/interfaces/FloorListEntity";

interface SearchProps {
  data: FloorListEntity[];
  setSearchData: (value: FloorListEntity[]) => void;
  searchInput: string;
  setSearchInput: (value: string) => void;
  setPage: (value: number) => void;
}


export function Search({ data, setSearchData, searchInput, setSearchInput, setPage }: SearchProps) {

  const { setFloorsPerPage } = useFloorListStore()
  const searchFilter = (textInput: React.ChangeEvent<HTMLInputElement>) => {
    const text = textInput.target.value.toString()
    
  if (!text) {
    setSearchData(data);
    setSearchInput(text);
    return;
  }

  let filteredData = [...data].filter((item) => 
    item.name.toLowerCase().includes(text)
  );

  // Se não encontrar pelo nome, busca pelo ID
  if (filteredData.length === 0) {
    filteredData = [...data].filter((item) => 
      String(item.id).includes(text)
    );
  }

  setSearchData(filteredData);
  setSearchInput(text);
  setFloorsPerPage(10);
  setPage(1);
}

  return(
    <div className="flex flex-col items-start">
      <div className="w-[300px] space-y-4">
        <h1 className="font-semibold">Todos os Andares</h1>
        <Input
          value={searchInput}
          placeholder="Nome ou ID do andar"
          handleValue={searchFilter}
        />          
      </div>
        <div className="bg-black h-[1.5px] w-full mt-12"></div>
    </div>
  )
}