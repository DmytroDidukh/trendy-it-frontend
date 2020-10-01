import React from 'react';
import { Dropdown } from 'semantic-ui-react';

const DropDown = ({ options, handleDropDown, value }) => {
  return (
    <Dropdown
      onChange={handleDropDown}
      options={options}
      selection
      value={value}
    />
  );
};

export default DropDown;
