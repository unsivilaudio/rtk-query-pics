import { useState, type ReactNode } from 'react';
import { GoChevronDown, GoChevronLeft } from 'react-icons/go';

type ExpandedPanelProps = {
    header: ReactNode;
    children: ReactNode;
};

function ExpandablePanel({ header, children }: ExpandedPanelProps) {
    const [expanded, setExpanded] = useState(false);

    const handleClick = () => {
        setExpanded(!expanded);
    };

    return (
        <div className='mb-2 rounded border'>
            <div className='flex items-center justify-between p-2'>
                <div className='flex flex-row items-center justify-between'>
                    {header}
                </div>
                <div onClick={handleClick} className='cursor-pointer'>
                    {expanded ? <GoChevronDown /> : <GoChevronLeft />}
                </div>
            </div>
            {expanded && <div className='border-t p-2'>{children}</div>}
        </div>
    );
}

export default ExpandablePanel;
