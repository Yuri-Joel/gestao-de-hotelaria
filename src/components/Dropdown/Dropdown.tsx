/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentProps, FC, useEffect, useRef, useState } from 'react';
import useOutsideClick from '@/helpers/useOutsideClick';
import IconArrow from '@/assets/Icons/IconArrow';
import { Button } from '../Button/Button';

export interface DropdownItem {
    id: string;
    title: string;
}

interface DropdownProps {
    id: string;
    label?: string;
    data: DropdownItem[];
    selectedId?: string;
    onSelect?: (id: string) => void;
    Icon?: FC<any>;
    IconVisible?: boolean;
    customClassesButton?: string;
    IsLeft?: boolean;
    IsDisabled?: boolean;
}

interface InputProps extends ComponentProps<'input'> {
    index: number;
    setIsChecked: (T: boolean) => void;
    isChecked: boolean;
}

{/* <div class="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
    <input id="filter-radio-example-5" type="radio" value="" name="filter-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
        <label for="filter-radio-example-5" class="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">Last year</label>
</div> */}

const Checkbox: React.FC<InputProps> = ({ index, ...props }) => {
    return (
        <div className={`w-5 h-5 rounded-full border bg-[#5954FB] flex items-center justify-center`}>
            <input
                {...props}
                type="radio"
                id={`radio-${index}`}
                checked={props.isChecked}
                onChange={() => { props.setIsChecked(!props.isChecked) }}
                className={`size-[10px]`}
            />
        </div>
    )
}

const Dropdown = ({
    id,
    label,
    data,
    selectedId,
    onSelect,
    Icon,
    IconVisible,
    IsLeft,
    IsDisabled
}: DropdownProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const [selectedItem, setSelectedItem] = useState<DropdownItem | undefined>(
        selectedId ? data?.find((item) => item.id === selectedId) : undefined
    );

    const handleChange = (item: DropdownItem) => {
        setSelectedItem(item);
        if (onSelect) {
            onSelect(item.id);
        }
        setIsOpen(false);
    };

    useEffect(() => {
        if (selectedId && data) {
            const newSelectedItem = data.find((item) => item.id === selectedId);
            if (newSelectedItem) {
                setSelectedItem(newSelectedItem);
            }
        } else {
            setSelectedItem(undefined);
        }
    }, [selectedId, data]);

    const dropdownRef = useRef<HTMLDivElement>(null);
    useOutsideClick({
        ref: dropdownRef,
        handler: () => setIsOpen(false),
    });

    return (
        <div ref={dropdownRef} className='relative'>
            <Button
                type="button"
                handleClick={() => setIsOpen(!isOpen)}
                handleActive={() => IsDisabled ? false : true}
                className={`flex gap-2 items-center p-4 px-6 border ${IsDisabled ? 'disabled:bg-gray-300 text-gray-300' : 'border-primary text-primary'} ${!isOpen ? "bg-white  hover:bg-primary-300 w-full" : " w-full"}`}

                aria-label='Toggle dropdown'
                aria-haspopup='true'
                aria-expanded={isOpen}
            >
                {IconVisible && Icon && <Icon color={!isOpen ? "#5954FB" : "white"} />}
                <span className={`${!isOpen ? 'text-[#5954FB]' : 'text-white'}`}>{label}</span>
                <IconArrow color={!isOpen ? "primary" : "white"} direction={!isOpen ? "down" : "up"} />
            </Button>

            {isOpen && (
                <div aria-label='Dropdown menu' className={`fixed top-52 bg-white w-max max-h-52 overflow-y-auto py-3 rounded shadow-md z-10 text-base text-black-100 font-medium  ${IsLeft ? "right-[3rem] mt-2" : "right-44 mt-2"} `}
                >
                    <ul
                        role='menu'
                        aria-labelledby={id}
                        aria-orientation='vertical'
                        className='leading-10'
                    >
                        {data?.map((item, index) => (
                            <li
                                key={item.id}
                                onClick={() => handleChange(item)}
                                className={`flex items-center cursor-pointer hover:bg-primary-300 px-3 mx-[15px] mb-[5px] rounded gap-[15px] ${selectedItem?.id === item.id && "bg-primary-300"} `}
                            >
                                {
                                    selectedItem?.id === item.id ?
                                        <Checkbox
                                            key={index}
                                            isChecked={isChecked}
                                            setIsChecked={setIsChecked}
                                            index={index}
                                        />
                                        : <div className="w-5 h-5 bg-gray-100 rounded-full border" />
                                }
                                <span>{item.title}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Dropdown;