import { XIcon } from "@/assets/Icons/XIcon";
import { modalManagementStore } from "@/store/modalManagementStore";
import { useEffect } from "react";

interface ModalProps {
    title?: string;
    children: React.ReactNode;
	description?: string;
}

export const Modal = ({ title, children }: ModalProps) => {
    const { showModal, setShowModal } = modalManagementStore()

    useEffect(() => {
        let timeout: NodeJS.Timeout;

        if (showModal) {
            setShowModal(true);
        } else {
            timeout = setTimeout(() => setShowModal(false), 300); // Tempo para animar saída
        }

        return () => clearTimeout(timeout);
    }, [showModal]);

    if (!showModal) return null;

    const handleClose = () => {
        setShowModal(false)
    }
    return (
        <div
            className={`fixed inset-0 bg-black/20  flex items-center justify-center z-50 p-4  transition-all duration-300`}
        >
            <div
                className={`relative w-11/12 max-w-lg p-6 bg-white rounded-2xl shadow-2xl `}
            >
                <div className="flex items-center justify-between mb-4">
                    {title && <h2 className="text-xl font-bold text-gray-800">{title}</h2>}
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
