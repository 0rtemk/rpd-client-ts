import { useState, useEffect, FC } from 'react';
import { ActionMeta, SingleValue } from 'react-select';
import Select from 'react-select';
import Selector from './Selector';
import Loader from '../../helperComponents/Loader';
import { Box, Button } from '@mui/material';
import useStore from '../../store/store';
import { OptionType } from '../../types/SelectorTypes';
import { VariantType, enqueueSnackbar } from 'notistack';

interface JsonData {
    [key: string]: string | JsonData;
}

type Nullable<T> = T | undefined;

interface SelectorsState {
    faculty: Nullable<OptionType>;
    levelEducation: Nullable<OptionType>;
    directionOfStudy: Nullable<OptionType>;
    profile: Nullable<OptionType>;
    formEducation: Nullable<OptionType>;
    year: Nullable<OptionType>;
}

interface Selectors {
    setChoise: (value: string) => void;
}

const Selectors: FC<Selectors> = ({ setChoise }) => {
    const selectorsData = useStore.getState().selectedTemplateData;
    const [selectors, setSelectors] = useState<SelectorsState>({
        faculty: selectorsData.faculty ?
            { value: selectorsData.faculty, label: selectorsData.faculty } :
            undefined,
        levelEducation: selectorsData.levelEducation ?
            { value: selectorsData.levelEducation, label: selectorsData.levelEducation } :
            undefined,
        directionOfStudy: selectorsData.directionOfStudy ?
            { value: selectorsData.directionOfStudy, label: selectorsData.directionOfStudy } :
            undefined,
        profile: selectorsData.profile ?
            { value: selectorsData.profile, label: selectorsData.profile } :
            undefined,
        formEducation: selectorsData.formEducation ?
            { value: selectorsData.formEducation, label: selectorsData.formEducation } :
            undefined,
        year: selectorsData.year ?
            { value: selectorsData.year, label: selectorsData.year } :
            undefined,
    });

    const [data, setData] = useState<Nullable<JsonData>>(undefined);
    const { setSelectedTemplateData } = useStore();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/json_profiles.json', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                });
                const jsonData: JsonData = await response.json();
                setData(jsonData);

            } catch (error) {
                const variant: VariantType = 'error'
                enqueueSnackbar('Ошибка закгруки профилей', { variant });
            }
        };

        fetchData();
    }, []);

    const handleChange = (name: keyof SelectorsState) => (selectedOption: SingleValue<OptionType>) => {
        setSelectors(prevSelectors => ({
            ...prevSelectors,
            [name]: selectedOption || undefined,
            ...(name === 'faculty' && { levelEducation: undefined, directionOfStudy: undefined, profile: undefined, formEducation: undefined, year: undefined }),
            ...(name === 'levelEducation' && { directionOfStudy: undefined, profile: undefined, formEducation: undefined, year: undefined }),
            ...(name === 'directionOfStudy' && { profile: undefined, formEducation: undefined, year: undefined }),
            ...(name === 'profile' && { formEducation: undefined, year: undefined }),
            ...(name === 'formEducation' && { year: undefined }),
        }));
    };

    const getOptions = (): OptionType[] => {
        return data
            ? Object.keys(data).map(key => ({ label: key, value: key }))
            : [];
    };

    const getOptionsForSelector = (selectorPath: Array<string>, indicator?: string): OptionType[] => {
        if (!data) return [];
        let currentData = data;

        for (const key of selectorPath) {
            currentData = currentData[key] as JsonData;
            if (!currentData) {
                return [];
            }
        }
        if (indicator && indicator === 'lastChild') return Object.entries(currentData).map(([key, value]) => ({ label: String(value), value: String(value) }));
        return Object.keys(currentData).map(key => ({ label: key, value: key }));
    };

    const saveTemplateData = () => {
        setSelectedTemplateData(
            selectors.faculty?.value,
            selectors.levelEducation?.value,
            selectors.directionOfStudy?.value,
            selectors.profile?.value,
            selectors.formEducation?.value,
            selectors.year?.value
        )

        setChoise("workingType")
    }

    if (!data) return <Loader />

    return (
        <Box sx={{ py: 1, maxWidth: "500px" }}>
            <Box>Шаг 1. Выбор данных</Box>
            <Box sx={{ fontSize: "20px", fontWeight: "600", py: 1 }}>Институт</Box>
            <Select
                placeholder="Выберите институт"
                isClearable
                value={selectors.faculty}
                onChange={handleChange('faculty')}
                options={getOptions()}
            />
            {selectors.faculty && (
                <Selector
                    title="Уровень образования"
                    placeholder="Выберите уровень образования"
                    value={selectors.levelEducation}
                    onChange={handleChange('levelEducation')}
                    options={getOptionsForSelector([
                        selectors.faculty.value
                    ])}
                />
            )}
            {selectors.faculty && selectors.levelEducation && (
                <Selector
                    title="Направление обучения"
                    placeholder="Выберите направление обучения"
                    value={selectors.directionOfStudy}
                    onChange={handleChange('directionOfStudy')}
                    options={getOptionsForSelector([
                        selectors.faculty.value,
                        selectors.levelEducation.value
                    ])}
                />
            )}
            {selectors.faculty && selectors.levelEducation && selectors.directionOfStudy && (
                <Selector
                    title="Профиль направления обучения"
                    placeholder="Выберите профиль обучения"
                    value={selectors.profile}
                    onChange={handleChange('profile')}
                    options={getOptionsForSelector([
                        selectors.faculty.value,
                        selectors.levelEducation.value,
                        selectors.directionOfStudy.value
                    ])}
                />
            )}
            {selectors.faculty && selectors.levelEducation && selectors.directionOfStudy && selectors.profile && (
                <Selector
                    title="Форма обучения"
                    placeholder="Выберите форму обучения"
                    value={selectors.formEducation}
                    onChange={handleChange('formEducation')}
                    options={getOptionsForSelector([
                        selectors.faculty.value,
                        selectors.levelEducation.value,
                        selectors.directionOfStudy.value,
                        selectors.profile.value
                    ])}
                />
            )}
            {selectors.faculty && selectors.levelEducation && selectors.directionOfStudy && selectors.profile && selectors.formEducation && (
                <Selector
                    title="Год набора"
                    placeholder="Выберите год набора"
                    value={selectors.year}
                    onChange={handleChange('year')}
                    options={getOptionsForSelector([
                        selectors.faculty.value,
                        selectors.levelEducation.value,
                        selectors.directionOfStudy.value,
                        selectors.profile.value,
                        selectors.formEducation.value
                    ], 'lastChild')}
                />
            )}
            {selectors.year && (
                <Button variant="outlined" onClick={saveTemplateData}>Продолжить</Button>
            )}
        </Box>
    );
};
export default Selectors;