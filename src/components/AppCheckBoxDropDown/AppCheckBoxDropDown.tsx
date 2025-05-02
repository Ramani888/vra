import { Checkbox, FormControl, ListItemText, MenuItem, OutlinedInput, Select } from '@mui/material'
import React from 'react'
import { AppCheckBoxDropDownContainer, DropDownLabelAndErrorContainer, TextLabel, TextLabelSpan } from './AppCheckBoxDropDown.styled';
// import './AppCheckBoxDropDown.scss'

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

interface Props {
    name: string;
    value: string[];
    minWidth?: string;
    handleChange: (e: any) => void;
    handleBlur: (e: any) => void;
    data: any[];
    isRequired?: boolean;
    touched: any;
    label: string;
    errors: any;
    placeHolder: string;
}

const AppCheckBoxDropDown: React.FC<Props> = ({ name, value, minWidth, handleChange, data, isRequired, touched, label, errors, handleBlur, placeHolder }) => {
  return (
    <AppCheckBoxDropDownContainer>
        <DropDownLabelAndErrorContainer>
            <TextLabel>{label} <TextLabelSpan>{isRequired ? '*' : ''}</TextLabelSpan></TextLabel>
            <div style={{color: 'red', fontStyle: 'italic', fontSize: 12}}>
            {errors[name] && touched[name] && errors[name]}
            </div>
        </DropDownLabelAndErrorContainer>
        <FormControl sx={{minWidth: minWidth ?? 'auto'}}>
            <Select
            displayEmpty
            multiple
            value={value}
            name={name}
            onChange={handleChange}
            onBlur={handleBlur}
            input={<OutlinedInput />}
            renderValue={(selected) => {
              if (selected.length === 0) {
                  return <em>{placeHolder}</em>;
              }
              return selected.join(', ');
            }}
            placeholder='sdcsdc'
            MenuProps={MenuProps}
            >
              <MenuItem disabled value="" style={{width: '100%'}}>
                <em>{placeHolder}</em>
              </MenuItem>
                {data.map((item) => (
                  <MenuItem key={item} value={item}>
                    <Checkbox checked={value.indexOf(item) > -1} />
                    <ListItemText primary={item} />
                  </MenuItem>
                ))}
            </Select>
        </FormControl>
    </AppCheckBoxDropDownContainer>
  )
}

export default AppCheckBoxDropDown