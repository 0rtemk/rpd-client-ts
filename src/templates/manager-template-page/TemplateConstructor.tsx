import { FC, useState } from "react";
import useStore from "../../store/store";
import { Box, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";

interface TemplateDataTitles {
    [key: string]: string
}

interface TemplateConstructor {
    setChoise: (value: string) => void;
}

interface SelectorOption {
    label: string;
    value: string;
}

// Пример объекта с опциями для селекторов
const selectorOptions = {
    workType: [
        { label: 'Создание нового шаблона РПД', value: 'create' },
        { label: 'Редактирование существующего шаблона РПД', value: 'edit' },
    ],
    creationType: [
        { label: 'На основе выгрузки 1C', value: '1c' },
        { label: 'На основе шаблона прошлого года', value: 'previousYearTemplate' },
        { label: 'На основе шаблона другого института', value: 'otherInstituteTemplate' },
    ],
    year: [
        { label: '2023', value: '2023' },
        { label: '2022', value: '2022' },
        { label: '2021', value: '2021' },
        { label: '2020', value: '2020' },
    ],
    institute: [
        { label: 'Институт системного анализа и управления', value: 'ISAU' },
        { label: 'Инженерно физический институт', value: 'EFI' },
        { label: 'Факультет социальных и гуманитарных наук', value: 'FSHS' },
        { label: 'Факультет естественных и инженерных наук', value: 'FNES' },
    ],
};

const TemplateConstructor: FC<TemplateConstructor> = ({ setChoise }) => {
    const { selectedTemplateData } = useStore();

    const templateDataTitles: TemplateDataTitles = {
        faculty: "Институт",
        levelEducation: "Уровень образования",
        directionOfStudy: "Направление обучения",
        profile: "Профиль направления обучения",
        formEducation: "Форма обучения",
        year: "Год набора"
    }

    const [selected, setSelected] = useState({
        workType: '',
        creationType: '',
        year: '',
        institute: '',
    });

    const handleSelectChange = (name: keyof typeof selected) => (event: SelectChangeEvent) => {
        setSelected(prev => ({
            ...prev,
            [name]: event.target.value,
            ...(name === 'workType' && { creationType: '', year: '', institute: '' }),
            ...(name === 'creationType' && { year: '', institute: '' }),
        }));
    };

    const renderSelector = (
        name: keyof typeof selected,
        label: string,
        options: SelectorOption[],
        dependsOn?: keyof typeof selected
    ) => {
        if (dependsOn && !selected[dependsOn]) {
            return null; // Не рендерим этот селектор, если нет значения в родительском селекторе
        }

        return (
            <FormControl fullWidth margin="normal">
                <InputLabel>{label}</InputLabel>
                <Select
                    value={selected[name]}
                    label={label}
                    onChange={handleSelectChange(name)}
                    key={name}  // Предоставляем уникальный ключ
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
            (selected.creationType !== 'previousYearTemplate' || (selected.creationType === 'previousYearTemplate' && selected.year)) &&
            (selected.creationType !== 'otherInstituteTemplate' || (selected.creationType === 'otherInstituteTemplate' && selected.institute))
        ))
    );


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
                {selected.creationType === 'previousYearTemplate' && renderSelector('year', 'Выберите год набора', selectorOptions.year)}
                {selected.creationType === 'otherInstituteTemplate' && renderSelector('institute', 'Выберите институт', selectorOptions.institute)}
            </Box>
            {allSelectorsFilled && (
                <Button variant="outlined">
                    Продолжить
                </Button>
            )}
        </>
    );
}

export default TemplateConstructor;