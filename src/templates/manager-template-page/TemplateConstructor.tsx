import { FC, useState } from "react";
import useStore from "../../store/store";
import { Box, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { OptionType } from "../../types/SelectorTypes";
import { TemplateConstructorType } from "../../types/TemplateConstructorTypes";
import { selectorOptions } from "../constants/selectorOptions";
import { templateDataTitles } from "../constants/templateDataTitles";

const TemplateConstructor: FC<TemplateConstructorType> = ({ setChoise }) => {
    const { selectedTemplateData } = useStore();

    const [selected, setSelected] = useState({
        workType: '',
        creationType: '',
        institute: '',
    });

    const handleSelectChange = (name: keyof typeof selected) => (event: SelectChangeEvent) => {
        setSelected(prev => ({
            ...prev,
            [name]: event.target.value,
            ...(name === 'workType' && { creationType: '', institute: '' }),
            ...(name === 'creationType' && { institute: '' }),
        }));
    };

    const renderSelector = (
        name: keyof typeof selected,
        label: string,
        options: OptionType[],
        dependsOn?: keyof typeof selected
    ) => {
        if (dependsOn && !selected[dependsOn]) {
            return null;
        }

        return (
            <FormControl fullWidth margin="normal">
                <InputLabel>{label}</InputLabel>
                <Select
                    value={selected[name]}
                    label={label}
                    onChange={handleSelectChange(name)}
                    key={name}
                >
                    {options.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        );
    };

    const allSelectorsFilled = selected.workType && (
        selected.workType !== 'create' ||
        (selected.workType === 'create' && selected.creationType && (
            (selected.creationType !== 'currentYearTemplate' || selected.creationType === 'currentYearTemplate') &&
            (selected.creationType !== 'otherInstituteTemplate' || (selected.creationType === 'otherInstituteTemplate' && selected.institute))
        ))
    );

    const setSelectType = () => {
        if (selected.workType === 'edit') setChoise("changeTemplate");
        if (selected.workType === 'create' && selected.creationType === 'currentYearTemplate') setChoise("createTemplateFromCurrentYear");
    }

    return (
        <>
            <Box>Шаг 2. Создание/редактирование шаблона</Box>
            <Box sx={{ py: 2, fontSize: "18px", fontWeight: "600" }}>Выбранные данные:</Box>
            {Object.entries(selectedTemplateData).map(([key, value]) => (
                <Box sx={{ pl: "40px" }}>
                    <Box component="span" sx={{ fontWeight: "600" }}>{templateDataTitles[key]}: </Box>
                    {value ? value : "Данные не найдены"}
                </Box>
            ))}
            <Box width={450}>
                {renderSelector('workType', 'Выберите тип работы с РПД', selectorOptions.workType)}
                {selected.workType === 'create' && renderSelector('creationType', 'Выберите тип создания РПД', selectorOptions.creationType)}
                {selected.creationType === 'otherInstituteTemplate' && renderSelector('institute', 'Выберите институт', selectorOptions.institute)}
            </Box>
            <Button variant="outlined" onClick={() => setChoise("selectData")}>
                Назад
            </Button>
            {allSelectorsFilled && (
                <Button variant="outlined" onClick={setSelectType}>
                    Продолжить
                </Button>
            )}
        </>
    );
}

export default TemplateConstructor;