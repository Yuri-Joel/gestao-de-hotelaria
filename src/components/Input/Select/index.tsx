import IconArrow from '@/assets/Icons/IconArrow';
import React, { useState } from 'react';
import Dropdown from './Dropdown';
import { twMerge } from 'tailwind-merge';
import { XIcon } from '@/assets/Icons/XIcon';

type T = React.ComponentProps<"div"> & {
  data: string[];
  placeholder?: string;
  setSelected: (T: string) => void;
  selectedItem: any;
  name: string;
  isObjectId?: boolean;
  disabled?: boolean;
  dropdownPositionAbsolute?: boolean;
  hideIcon?: boolean;

  closeButtonVisible?: boolean;
  handleCloseButton?: any;
  isLoadingCloseButton?: boolean;
}

const Select: React.FC<T> = ({ data, placeholder, selectedItem, setSelected, name, isObjectId, disabled, dropdownPositionAbsolute = false, hideIcon, closeButtonVisible, handleCloseButton, isLoadingCloseButton = false, className }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onClick = () => setIsOpen(!isOpen);

  const addTag = (item: string) => {
    if (isObjectId && selectedItem?.name === item) {
      setSelected(selectedItem);
      setIsOpen(false);
    } else if (selectedItem === item) {
      setSelected(selectedItem);
      setIsOpen(false);
    } else {
      setSelected(item);
      setIsOpen(false);
    }
  };

  return (
    <div className={`w-full ${dropdownPositionAbsolute && 'relative z-10'}`}>
      <div className={twMerge(`flex flex-col h-14 rounded-lg border cursor-pointer ${selectedItem && "bg-white"} ${isOpen ? "border-primary bg-white" : "border-gray-200 bg-gray-50"}`, className)} onClick={onClick}>
        <div className="flex flex-1 justify-between items-center px-[12px] ">
          <div className={`flex ${closeButtonVisible && "flex-1 items-center justify-center"}`}>
            <span className={`${closeButtonVisible && "bg-gray-200 w-1/2 text-center truncate px-[5px] select-none"}`}>{isObjectId ? selectedItem?.name || placeholder : selectedItem || placeholder}</span>
            <input
              type="text"
              name={name}
              defaultValue={isObjectId ? selectedItem?._id : selectedItem}
              disabled={disabled}
              className="hidden"
            />
          </div>

          {(!hideIcon && !closeButtonVisible) && <IconArrow color={!isOpen ? "disabled" : "primary"} direction={!isOpen ? "down" : "up"} />}

          {closeButtonVisible && (<button
            type="button"
            onClick={handleCloseButton}
            className="size-5 text-zinc-400"
            disabled={isLoadingCloseButton}
          >
            <XIcon width="20" height="20" fill="#5954FB" />
          </button>)}
        </div>
      </div>
      {disabled ? null : isOpen && <Dropdown list={data} addItem={addTag} dropdownPositionAbsolute={dropdownPositionAbsolute} />}

    </div>
  )
};

export default Select;