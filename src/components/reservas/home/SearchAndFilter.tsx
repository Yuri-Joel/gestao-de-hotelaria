'use client'
import { reserveStore } from "@/store/reserveStore";
import { Input } from "@/components/Input/Input";
import { Button } from "@/components/Button/Button";
import { Checkbox } from "@/components/Input/CheckBox";
import DatePicker from "react-datepicker";
import { datePickerStore } from "@/store/datePickerStore";
import { ReserversEntity } from "@/interfaces/reserve";
import { CgChevronLeft, CgChevronRight } from "react-icons/cg";
import { formatDate } from "@/helpers/formatDateReserve";
import { useEffect } from "react";

interface SearchProps {
  data: ReserversEntity[];
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

  const { 
    searchInput, 
    searchData, 
    setSearchData, 
    setSearchInput, 
    setPage,
    currentDate, 
    setCurrentDate,
    setReservePerPage, 
    setIschecked, 
    isChecked 
  } = reserveStore()
  
  const { 
    endDate, 
    startDate, 
    setEndDate, 
    setStartDate, 
    openedCalendarEnd, 
    openedCalendarStart, 
    setOpenedEndCalendar, 
    setOpenedStartCalendar 
  } = datePickerStore()

  const searchFilter = () => {
    
    let filteredData = data.filter((item) => item.guest.name.toLowerCase().includes(searchInput.toLowerCase()));
    
      // Se não encontrar pelo nome, busca pelo ID
    if (filteredData.length === 0) {
      filteredData = [...data].filter((item) => 
        String(item.id).includes(searchInput)
      );
    }
    
    setSearchData(filteredData);
    setSearchInput(searchInput);
    setReservePerPage(10);
    setEndDate(null)
    setStartDate(null)
    setIschecked("")
    setPage(1);
  }
  
  function handleRedifine() {
    setIschecked("")
    setSearchInput("")
    setEndDate(null)
    setStartDate(null)
    setSearchData(data)
  }

  function handleChange(textInput: React.ChangeEvent<HTMLInputElement>) {
    const text = textInput.target.value.toString()
    setSearchInput(text);
  }

  function handleChecked(id: string){
    setIschecked(isChecked === id ? "" : id);
  }

  const normalizeDate = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  };

  function handleClickDate() {
    let filteredData = searchData
    
    const itemChecked = itemsFilter.filter((item) => item.id === isChecked)

    switch (itemChecked[0].title) {
      case "Check-in":
        if (startDate && endDate) {
          filteredData = data.filter((item) => {
            const checkInDate = normalizeDate(new Date(item.checkIn));
            const start = normalizeDate(new Date(startDate));
            const end = normalizeDate(new Date(endDate));

            return checkInDate >= start && checkInDate <= end;
          });
          setSearchData(filteredData);
          setSearchInput("");
          setReservePerPage(10);
          setPage(1);
        }
        break;
      case "Check-out":
        if (startDate && endDate) {
          filteredData = data.filter((item) => {
            const checkOutDate = normalizeDate(new Date(item.checkOut));
            const start = normalizeDate(new Date(startDate));
            const end = normalizeDate(new Date(endDate));

            return checkOutDate >= start && checkOutDate <= end;
          });
          
          setSearchData(filteredData);
          setSearchInput("");
          setReservePerPage(10);
          setPage(1);
        }
      break;
      case "Data de criação":
        if (startDate && endDate) {
          filteredData = data.filter((item) => {
            const createdAt = normalizeDate(new Date(item.createdAt));
            const start = normalizeDate(new Date(startDate));
            const end = normalizeDate(new Date(endDate));

            return createdAt >= start && createdAt <= end;
          });
          setSearchData(filteredData);
          setSearchInput("");
          setReservePerPage(10);
          setPage(1);
        }
      break;
      default:
        break;
    }

  }

  const nextDay = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1));
  };

  const previousDay = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 1));
  };

  useEffect(()=>{
    if (!isChecked || !searchInput) {
      setSearchData(data)
    }
  }, [isChecked])

  useEffect(() => {
    
  
    let filteredData = data;

    filteredData = data.filter((item) => {
      const checkInDate = new Date(item.checkIn);
      return checkInDate.toDateString() === currentDate.toDateString();
    });
  
    setSearchData(filteredData);
    setSearchInput("");
    setReservePerPage(10);
    setPage(1);
  }, [currentDate]);

  return(
    <div className="flex flex-col items-start gap-7">
      <div className=" w-[51.3rem] gap-4 flex items-center justify-center ">
        <Input
          value={searchInput}
          placeholder="Nome ou ID da reserva"
          handleValue={handleChange}
          className="rounded-lg"
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
                    onClick={()=> handleChecked(item.id)}
                    className="mb-3 border"
                  />
                  <span>{item.title}</span>
                </li>
              ))
            }
          </ul>
        </div>

        <div className="flex items-center justify-start gap-4 ml-3">
          <div className="relative">
            <button
              className="border flex flex-col w-[20rem] rounded-lg"
              onClick={() => setOpenedStartCalendar(!openedCalendarStart)}
            >
              <span className="font-semibold text-gray-500 px-2 py-[2px]">De</span>
              <div className="px-[5rem] text-center w-full text-gray-500 h-[2rem]">
                <span>{startDate ? startDate.toLocaleDateString() : "DD/MM/AAAA"}</span>
              </div>
            </button>

            {openedCalendarStart && (
              <div className="absolute top-8 left-0 z-50 px-[2.6rem]">
                <DatePicker
                  onChange={(date) => setStartDate(date)}
                  selected={startDate}
                  inline
                  onClickOutside={() => setOpenedStartCalendar(false)}
                />
              </div>
            )}
          </div>
          
            <div className="relative">
              <button
                className="border flex flex-col w-[20rem] rounded-lg"
                onClick={() => setOpenedEndCalendar(!openedCalendarEnd)}
                disabled={!startDate}
              >
                <span className="font-semibold text-gray-500 px-2 py-[2px]">A</span>
                <div className="px-[5rem] text-center w-full text-gray-500 h-[2rem]">
                  <span>{endDate ? endDate.toLocaleDateString() : "DD/MM/AAAA"}</span>
                </div>
              </button>

              {openedCalendarEnd && (
                <div className="absolute top-8 left-0 z-50 px-[2.6rem]">
                  <DatePicker
                    onChange={(date) => setEndDate(date)}
                    className="bg-red-200"
                    selected={endDate}
                    minDate={
                      startDate ? new Date(startDate.getTime() + 86400000) : undefined
                    }
                    inline
                    onClickOutside={() => setOpenedEndCalendar(false)}
                  />
                </div>
              )}
            </div>
          <Button 
            children="Aplicar"
            handleActive={() => startDate && endDate && isChecked ? true : false}
            className="w-[135px] py-4 rounded-full"
            handleClick={handleClickDate}
          />
        </div>
        <div className="flex flex-col mt-4 gap-4 mx-3 w-full">
        <button className="font-bold text-primary-700 text-start w-[5rem]" onClick={handleRedifine}>Redefinir</button>
        <div className="flex items-center gap-2">
          <button className="bg-gray-90 size-6 rounded-full flex items-center justify-center">
            <CgChevronLeft 
              className="size-5" 
              onClick={previousDay}
            />
          </button>
          <span>{formatDate(currentDate)}</span>
          <button className="bg-gray-90 size-6 rounded-full text-center flex items-center">
            <CgChevronRight 
              className="size-5" 
              onClick={nextDay}
            />
          </button>
        </div>
      </div>
      </div>
    </div>
  )
}