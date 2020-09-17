import React from 'react';
import { Dropdown } from 'semantic-ui-react'

const DropDown = ({ id, options, handleDropDown, name }) => {
        return (
                <Dropdown
                        id={id}
                        onChange={handleDropDown}
                        options={options}
                        placeholder='Виберіть розмір'
                        selection
                        value={name}
                />
        )
}

export default DropDown;
