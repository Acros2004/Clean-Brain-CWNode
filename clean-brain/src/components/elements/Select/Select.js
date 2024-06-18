import React, { useCallback, useRef, useState, useEffect } from "react";
import "./Select.css"

const Select = ({ data, selectedItem, onSelect }) =>{
    const ref = useRef(null);
    const [isOpen,setIsOpen] = useState(false);
    const controlList = useCallback(() => {
        setIsOpen(!isOpen);
    },[isOpen]);

    const handleSelectItem = (item) => {
        onSelect(item)
        controlList()
    };

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
        <div ref={ref} className="select-block">
        <div onClick={controlList} className="select-preview-block">
            {selectedItem}
        </div>
        {
            isOpen && <div className="select-list-item-block">
                {
                data.map((item, index) => (
                    <div key={index} className="select-item-block" onClick={() => handleSelectItem(item)}>
                        {item}
                    </div>))
                }
            </div>
        }
        </div>
    );   
}

export default Select;