import { useState } from 'react';

interface TooltipProps {
    title: string;
    children: React.ReactNode;
}

const Tooltip = ({ children, title }: TooltipProps) => {
    const [visible, setVisible] = useState(false);

    const showTooltip = () => setVisible(true);
    const hideTooltip = () => setVisible(false);

    return (
        <div className="relative inline-block" onMouseEnter={showTooltip} onMouseLeave={hideTooltip}>
            {children}
            {visible && (
                <div className="absolute right-0 transform top-full mt-2 w-max px-2 py-1 text-white text-sm rounded shadow-lg bg-gray-700">
                    {title}
                    <div className="tooltip-arrow" style={{ borderColor: 'transparent transparent #161616 transparent' }}></div>
                </div>
            )}
        </div>
    );
};
export default Tooltip;
