import { Box } from '@mui/material';
import React from 'react';
import Select, { ActionMeta, SingleValue } from 'react-select';
import { OptionType } from '../../types/SelectorTypes';

interface CustomSelector {
    title: string;
    placeholder: string;
    value: OptionType | undefined;
    onChange: (selectedOption: SingleValue<OptionType>, actionMeta: ActionMeta<OptionType>) => void;
    options: OptionType[];
}

const CustomSelector: React.FC<CustomSelector> = ({ title, placeholder, value, onChange, options }) => {
    return (
        <Box sx={{ my: 1 }}>
            <Box sx={{fontSize: "20px", fontWeight: "600", py: 1}}>
                {title}
            </Box>
            <Select
                placeholder={placeholder}
                isClearable
                value={value}
                onChange={onChange}
                options={options}
            />
        </Box>
    );
};

export default CustomSelector;