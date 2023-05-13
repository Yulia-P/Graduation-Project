import React from 'react';

export const CheckBoxItem = ({mark}) => {

    return (
        <div>
            <input
                type="checkbox"
                name="rubbish"
                checked={mark.selected}
                onChange={onChange}
            />
            <span>{mark.label}</span>
        </div>
    )
}