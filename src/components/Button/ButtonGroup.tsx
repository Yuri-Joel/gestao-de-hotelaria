import React from 'react';

type ButtonGroupProps = {
    children: React.ReactNode;
    bgColor?: string;
    textColor?: string;
    borderColor?: string;
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({
    children,
    bgColor = 'bg-white',
    textColor = 'text-blue-300',
    borderColor = 'border-gray-300'
}) => {
    // Convert children to an array
    const childrenArray = React.Children.toArray(children);

    // Iterate over children and apply styles
    const styledChildren = childrenArray.map((child, index) => {
        const isFirstChild = index === 0;
        const isLastChild = index === childrenArray.length - 1;

        const className = `
            px-4 py-2 
            ${isFirstChild ? 'rounded-l-md' : ''} 
            ${isLastChild ? 'rounded-r-md' : ''} 
            ${!isFirstChild && 'border-l ' + borderColor}
            disabled:bg-gray-100
            hover:bg-gray-100 
            focus:outline-none 
            focus:ring-2 
            focus:ring-gray-200
        `;

        // Clone each child and add the className
        return React.cloneElement(child as React.ReactElement<React.HTMLAttributes<HTMLButtonElement>>, { className });
    });

    return (
        <div className={`inline-flex rounded-md shadow border ${borderColor} ${bgColor} ${textColor}`}>
            {styledChildren}
        </div>
    );
}

export default ButtonGroup;
