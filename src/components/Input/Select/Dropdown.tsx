import React, { useEffect } from 'react'

type T = {
  list: string[]
  addItem: (T: string) => void
  dropdownPositionAbsolute?: boolean
}

const Dropdown: React.FC<T> = ({ list = [], addItem, dropdownPositionAbsolute }) => {
  return (
    // <div id="dropdown" className="absolute shadow top-100 bg-white z-40 w-full lef-0 rounded max-h-select overflow-y-auto ">
    <div
      className={`border bg-white rounded-md max-h-[200px] mt-2 ${Array.isArray(list) && list.length > 4 ? 'overflow-y-scroll' : ''} ${dropdownPositionAbsolute && 'absolute w-full'}`}
    >
      <div className="flex flex-col w-full">
        {list.map((item, key) => {
          return (
            <div
              key={key}
              className={`cursor-pointer w-full rounded-t ${Array.isArray(list) && list.length > 0 && list.length !== 1 ? 'border-b border-gray-100' : ''} hover:bg-primary-300`}
              onClick={() => addItem(item)}
            >
              <div className="flex w-full items-center p-2 pl-2 border-transparent border-l-2 relative hover:border-teal-100">
                <div className="w-full items-center flex">
                  <div className="mx-2 leading-6  select-none">{item}</div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Dropdown
