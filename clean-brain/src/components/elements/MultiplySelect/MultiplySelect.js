import React, { useCallback, useRef, useState, useEffect } from "react";
import "./MultiplySelect.css"

const MultiplySelect = ({ data, selectedItems, onSelect }) =>{
    const ref = useRef(null);
    const [isOpen,setIsOpen] = useState(false);

    const controlList = useCallback(() => {
        setIsOpen(!isOpen);
    },[isOpen]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return(
        <div ref={ref} className="multiplySelect-block">
        <div onClick={controlList} className="multiplySelect-preview-block">
            Список
        </div>
        {
            isOpen && <div className="multiplySelect-list-item-block">
                {
                    data.map((item,index) => 
                        <div key={index} className="multiplySelect-item-block" onClick={() => onSelect(item)}>
                            {item} {selectedItems.includes(item) && '✔'}
                        </div>
                    )
                }
            </div>
        }
        </div>
    );   
}

export default MultiplySelect;