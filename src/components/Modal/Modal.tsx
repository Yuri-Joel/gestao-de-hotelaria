import { XIcon } from "@/assets/Icons/XIcon";
import { useEffect } from "react";

interface ModalProps {
  title?: string;
  children: React.ReactNode;
  description?: string;
  onClose: () => void;
  isOpen: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  title,
  children,
  isOpen,
  onClose,
  description,
}) => {
  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (!isOpen) {
      timeout = setTimeout(() => onClose, 300); // Tempo para animar saída
    }

    return () => clearTimeout(timeout);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleClose = () => {
    onClose();
  };
  return (
    <div
      className={`fixed inset-0 bg-black/20  flex items-center justify-center z-50 p-4  transition-all duration-300 ${isOpen ? "h-full" : "h-0"}`}
    >
      <div
        className={`relative w-11/12 max-w-lg p-6 bg-white rounded-2xl shadow-2xl `}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            {title && (
              <h2 className="text-xl font-bold text-black-800">{title}</h2>
            )}
            {description && (
              <p className="text-sm text-gray-600 mt-1">{description}</p>
            )}
          </div>
          <button
            onClick={handleClose}
            className="absolute right-4 top-4 text-black-500 hover:text-gray-700"
          >
            <XIcon fill="black" />
          </button>
        </div>
        <div className="">{children}</div>
      </div>
    </div>
  );
};
