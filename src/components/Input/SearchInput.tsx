
import { MagnifieIcon } from "@/assets/Icons/MagnifierIcon";
import { twMerge } from "tailwind-merge";

interface SearchInputProps {
    placeholder?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    isIconLeft?: boolean;
    className?: string;
    disabled?: boolean;
    value?: string;
}

const SearchInput = ({ placeholder, onChange, isIconLeft = false, disabled = false, value, className }: SearchInputProps) => {
    return (
        <div className={twMerge("relative bg-white w-full lg:w-[476px] h-14 flex", className)}>
            <div className={`absolute duration-75 z-10 top-4 right-2.5 size-6`}>
                <MagnifieIcon width={24} height={24} />
            </div>
            {value ?
                <input
                    value={value}
                    disabled={disabled}
                    onChange={onChange}
                    type="text"
                    placeholder={placeholder || "Pesquisar por hóspede, quarto ou andar"}
                    className={`m-auto disabled:bg-gray-100 z-20 duration-600 h-14 w-full p-9 pt-0 pb-0 outline-none rounded-lg border  bg-transparent focus:border-primary`}
                />
                :
                <input
                    disabled={disabled}
                    onChange={onChange}
                    type="text"
                    placeholder={placeholder || "Pesquisar por hóspede, quarto ou andar"}
                    className={`m-auto disabled:bg-gray-100 z-20 duration-600 h-14 w-full p-9 pt-0 pb-0 outline-none rounded-lg border  bg-transparent focus:border-primary italic`}
                    style={{ paddingRight: '2.5rem', paddingLeft: '1rem' }} // Ajusta padding-left e padding-right
                />
            }
        </div>
    );
};

export default SearchInput;
