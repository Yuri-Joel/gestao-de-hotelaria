'use client'
import { reserveStore } from "@/store/reserveStore";
import { Input } from "@/components/Input/Input";
import { Button } from "@/components/Button/Button";
import { Checkbox } from "@/components/Input/CheckBox";

interface SearchProps {
  data: Reservers[];
}


export function SearchAndFilter({ data }: SearchProps) {

  const itemsFilter = [
    {
      id: "1",
      title: "Check-in"
      
    },
    {
      id: "2",
      title: "Check-out"
    },
    {
      id: "3",
      title: "Data de criação"
    },
    {
      id: "4",
      title: "Canceladas em"
    },

  ]

  const { searchInput, searchData, setSearchData, setSearchInput, dateFrom, dateTo, setDateFrom, setDateTo, setPage, setReservePerPage, setIschecked, isChecked } = reserveStore()

  const searchFilter = () => {
    
    if (!searchInput) {
      setSearchData(data);
      setSearchInput(searchInput);
      return;
    }
    let filteredData = searchData.filter((item) => item.name.toLowerCase().includes(searchInput.toLowerCase()));
    
      // Se não encontrar pelo nome, busca pelo ID
    if (filteredData.length === 0) {
      filteredData = [...data].filter((item) => 
        String(item.id).includes(searchInput)
      );
    }
    
    setSearchData(filteredData);
    setSearchInput(searchInput);
    setReservePerPage(10);
    setPage(1);
  }

  function handleChange(textInput: React.ChangeEvent<HTMLInputElement>) {
    const text = textInput.target.value.toString()
    setSearchInput(text);
  }

  function handleChangeDateFrom(textInput: React.ChangeEvent<HTMLInputElement>) {
    const text = textInput.target.value
    setDateFrom(text)
  }

  function handleChangeDateTo(textInput: React.ChangeEvent<HTMLInputElement>) {
    const text = textInput.target.value
    setDateTo(text)
  }


  function handleChecked(id: string){
    if(id === isChecked){
      setIschecked("")
    }else {
      setIschecked(id)
    }
  }

  function handleClickDate() {

    let filteredData = searchData
    
    const itemChecked = itemsFilter.filter((item) => item.id === isChecked)

    switch (itemChecked[0].title) {
      case "Check-in":
        if (dateFrom && dateTo) {
          const fromDate = new Date(dateFrom);
          const toDate = new Date(dateTo);
          filteredData = data.filter((item) => {
            const checkInDate = item.checkIn;
            return checkInDate >= fromDate && checkInDate <= toDate;
          });
          setSearchData(filteredData);
          setSearchInput(searchInput);
          setReservePerPage(10);
          setPage(1);
        }
        break;
      case "Check-out":
        if (dateFrom && dateTo) {
          const fromDate = new Date(dateFrom);
          const toDate = new Date(dateTo);
          filteredData = data.filter((item) => {
            const checkOutDate = item.checkOut;
            return checkOutDate >= fromDate && checkOutDate <= toDate;
          });
          setSearchData(filteredData);
          setSearchInput(searchInput);
          setReservePerPage(10);
          setPage(1);
        }
      break;
      case "Data de criação":
        if (dateFrom && dateTo) {
          const fromDate = new Date(dateFrom);
          const toDate = new Date(dateTo);
          filteredData = data.filter((item) => {
            const createdAt = item.createAt;
            return createdAt >= fromDate && createdAt <= toDate;
          });
          setSearchData(filteredData);
          setSearchInput(searchInput);
          setReservePerPage(10);
          setPage(1);
        }
      break;
      default:
        break;
    }

  }
  return(
    <div className="flex flex-col items-start gap-7">
      <div className=" w-[51.3rem] gap-4 flex items-center justify-center ">
        <Input
          value={searchInput}
          placeholder="Nome ou ID da reserva"
          handleValue={handleChange}
        />          
        <Button 
          handleActive={() => searchInput?.length > 0 ? true : false}
          children="Buscar"
          className=" w-[170px] rounded-full py-4"
          handleClick={searchFilter}
        />
      </div>

      <div className="w-full flex flex-col gap-4">
        <div className="flex flex-col gap-3">
          <h1 className="text-left font-bold">Filtros</h1>
          <ul className="flex gap-4 ml-3">
            {
              itemsFilter.map((item,index) => (
                <li key={index} className="flex items-center justify-center gap-2">
                  <Checkbox
                    index={index}
                    isChecked={ isChecked === item.id ? true : false}
                    setIsChecked={()=> handleChecked(item.id)}
                    className="mb-3 border"
                  />
                  <span>{item.title}</span>
                </li>
              ))
            }
          </ul>
        </div>

        <div className="flex items-center justify-start gap-4 ml-3">
          <div className="border flex flex-col w-[20rem] rounded-lg">
            <span className="font-semibold text-gray-500 px-2 py-[2px]">De</span>
            <div className="px-[5rem]">
              <Input 
                type="date"
                handleValue={handleChangeDateFrom}
                value={dateFrom}
                className="h-8 border-0"
              />
            </div>
          </div>
          <div className="border flex flex-col w-[20rem] rounded-lg">
            <span className="font-semibold text-gray-500 px-2 py-[2px]">A</span>
            <div className="px-[5rem]">
              <Input 
                type="date"
                handleValue={handleChangeDateTo}
                value={dateTo}
                className="h-8 border-0"
              />
            </div>
          </div>
          <Button 
            children="Aplicar"
            handleActive={() => dateFrom && dateTo && isChecked ? true : false}
            className="w-[135px] py-4 rounded-full"
            handleClick={handleClickDate}
          />
        </div>

      </div>
    </div>
  )
}