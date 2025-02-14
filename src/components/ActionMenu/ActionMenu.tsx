import { useRef } from 'react';
import { Button } from '../Button/Button';
import { Types } from 'mongoose';
import { RightIcon } from '@/assets/Icons/RightIcon';

interface ActionMenuProps {
  itemId: string | Types.ObjectId;
  openMenuId: string | null;
  onSelect: (user: { _id: string | Types.ObjectId }, event: React.MouseEvent<HTMLDivElement>) => void;
  onDelete: (itemId: Types.ObjectId) => void;
}

export const ActionMenu: React.FC<ActionMenuProps> = ({
  itemId,
  openMenuId,
  onSelect,
  onDelete,
}) => {
  const menuRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex justify-center relative mt-2" ref={menuRef}>
      <div
        onClick={(e) => onSelect({ _id: itemId }, e)}
        className="w-6 h-6 bg-white border border-gray-300 rounded cursor-pointer flex items-center justify-center transition-colors"
      >
        {openMenuId === itemId && (
          <RightIcon className="text-gray-600 h-4 w-4" />
        )}
      </div>

      {openMenuId === itemId && (
        <div className="absolute top-full w-24 bg-white shadow-md border border-gray-90 rounded-lg shadow-mdring-1 ring-black ring-opacity-5 z-10">
          <div
            className="bg-white"
            role="menu"
            aria-orientation="vertical"
          >
            <Button
              className="w-full text-left px-4 py-2 text-sm text-gray-700 bg-white hover:bg-gray-100"
              role="menuitem"
              handleClick={() => true}
              handleActive={() => true}
            >
              Editar
            </Button>

            <Button
              className="w-full text-left px-4 py-2 text-sm text-red-600 bg-white hover:bg-gray-100"
              role="menuitem"
              handleClick={() => onDelete(new Types.ObjectId(itemId) )}
              handleActive={() => true}
            >
              Excluir
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};