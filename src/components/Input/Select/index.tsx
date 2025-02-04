import IconArrow from "@/assets/Icons/IconArrow"
import type React from "react"
import { useState } from "react"
import Dropdown from "./Dropdown"
import { twMerge } from "tailwind-merge"
import { XIcon } from "@/assets/Icons/XIcon"

type SelectProps = React.ComponentProps<"div"> & {
  data: string[]
  placeholder?: string
  setSelected: (item: string) => void
  selectedItem: { name?: string; _id?: string } | string
  name: string
  isObjectId?: boolean
  disabled?: boolean
  dropdownPositionAbsolute?: boolean
  hideIcon?: boolean
  closeButtonVisible?: boolean
  handleCloseButton?: () => void
  isLoadingCloseButton?: boolean
}

const Select: React.FC<SelectProps> = ({
  data,
  placeholder,
  selectedItem,
  setSelected,
  name,
  isObjectId,
  disabled,
  dropdownPositionAbsolute = false,
  hideIcon,
  closeButtonVisible,
  handleCloseButton,
  isLoadingCloseButton = false,
  className,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const onClick = () => setIsOpen(!isOpen)

  const addTag = (item: string) => {
    if (isObjectId && typeof selectedItem === "object" && selectedItem._id === item) {
      setSelected(selectedItem._id)
      setIsOpen(false)
    } else if (selectedItem === item) {
      setSelected(item)
      setIsOpen(false)
    } else {
      setSelected(item)
      setIsOpen(false)
    }
  }

  const renderSelectedItem = (): string => {
    if (isObjectId && typeof selectedItem === "object" && selectedItem._id) {
      return selectedItem._id
    }
    if (typeof selectedItem === "object" && selectedItem.name) {
      return selectedItem.name
    }
    return (typeof selectedItem === "string" ? selectedItem : "") || placeholder || ""
  }

  return (
    <div className={`w-full ${dropdownPositionAbsolute ? "relative z-10" : ""}`}>
      <div
        className={twMerge(
          `flex flex-col h-14 rounded-lg border cursor-pointer ${selectedItem ? "bg-white" : ""} ${isOpen ? "border-primary bg-white" : "border-gray-200 bg-gray-50"}`,
          className,
        )}
        onClick={onClick}
      >
        <div className="flex flex-1 justify-between items-center px-[12px]">
          <div className={`flex ${closeButtonVisible ? "flex-1 items-center justify-center" : ""}`}>
            <span
              className={`${closeButtonVisible ? "bg-gray-200 w-1/2 text-center truncate px-[5px] select-none" : ""}`}
            >
              {renderSelectedItem()}
            </span>
            <input
              type="text"
              name={name}
              defaultValue={
                isObjectId && typeof selectedItem === "object"
                  ? String(selectedItem._id || "")
                  : String(selectedItem || "")
              }
              disabled={disabled}
              className="hidden"
            />
          </div>

          {!hideIcon && !closeButtonVisible && (
            <IconArrow color={!isOpen ? "disabled" : "primary"} direction={!isOpen ? "down" : "up"} />
          )}

          {closeButtonVisible && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                handleCloseButton?.()
              }}
              className="size-5 text-zinc-400"
              disabled={isLoadingCloseButton}
            >
              <XIcon width="20" height="20" fill="#5954FB" />
            </button>
          )}
        </div>
      </div>

      {!disabled && isOpen && (
        <Dropdown list={data} addItem={addTag} dropdownPositionAbsolute={dropdownPositionAbsolute} />
      )}
    </div>
  )
}

export default Select

