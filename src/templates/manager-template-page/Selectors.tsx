import { useState, useEffect, FC } from 'react';
import { ActionMeta, SingleValue } from 'react-select';
import Select from 'react-select';
import Selector from './Selector';
import FindRpdTemplates from './FindRpdTemplates';
import Loader from '../../helperComponents/Loader';
import { Box, Button } from '@mui/material';
import useStore from '../../store/store';
import { OptionType } from '../../types/SelectorTypes';

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
    const [selectors, setSelectors] = useState<SelectorsState>({
        faculty: undefined,
        levelEducation: undefined,
        directionOfStudy: undefined,
        profile: undefined,
        formEducation: undefined,
        year: undefined
    });

    const [data, setData] = useState<Nullable<JsonData>>(undefined);
    const { setSelectedTemplateData, selectedTemplateData } = useStore();

    const fetchData = async () => {
        const response = await fetch('/json_profiles.json', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            const jsonData: JsonData = await response.json();
            setData(jsonData);
        } else {
            console.error('Error fetching the data');
        }
    };

    useEffect(() => {
        if (selectedTemplateData) {
          setSelectors({
            faculty: selectedTemplateData.faculty ? { value: selectedTemplateData.faculty, label: selectedTemplateData.faculty } : undefined,
            levelEducation: selectedTemplateData.levelEducation ? { value: selectedTemplateData.levelEducation, label: selectedTemplateData.levelEducation } : undefined,
            directionOfStudy: selectedTemplateData.directionOfStudy ? { value: selectedTemplateData.directionOfStudy, label: selectedTemplateData.directionOfStudy } : undefined,
            profile: selectedTemplateData.profile ? { value: selectedTemplateData.profile, label: selectedTemplateData.profile } : undefined,
            formEducation: selectedTemplateData.formEducation ? { value: selectedTemplateData.formEducation, label: selectedTemplateData.formEducation } : undefined,
            year: selectedTemplateData.year ? { value: selectedTemplateData.year, label: selectedTemplateData.year } : undefined
          });
        }
        fetchData();
      }, []);

      const handleChange = (name: keyof SelectorsState) => (
        selectedOption: SingleValue<OptionType>,
        actionMeta: ActionMeta<OptionType>
    ) => {
        console.log(`Action: ${actionMeta.action}`);
    
        const prevSelectors = { ...selectors };
    
        const updatedSelectors = {
            ...prevSelectors,
            [name]: selectedOption || undefined
        };
    
        const hasChanged = prevSelectors[name]?.value !== updatedSelectors[name]?.value;
    
        if (!hasChanged) {
            setSelectors(updatedSelectors);
            return;
        }
    
        setSelectors({
            ...updatedSelectors,
            ...(name === 'faculty' && { levelEducation: undefined, directionOfStudy: undefined, profile: undefined, formEducation: undefined, year: undefined }),
            ...(name === 'levelEducation' && { directionOfStudy: undefined, profile: undefined, formEducation: undefined, year: undefined }),
            ...(name === 'directionOfStudy' && { profile: undefined, formEducation: undefined, year: undefined }),
            ...(name === 'profile' && { formEducation: undefined, year: undefined }),
            ...(name === 'formEducation' && { year: undefined }),
        });
    };
    

    const getOptions = (): OptionType[] => {
        return data
            ? Object.keys(data).map(key => ({ label: key, value: key }))
            : [];
    };

    const getOptionsForSelector = (data: JsonData, selectorPath: Array<string>, indicator?: string): OptionType[] => {
        let currentData = data;

        for (const key of selectorPath) {
            currentData = currentData[key] as JsonData;
            if (!currentData) {
                return [];
            }
        }

        if(indicator && indicator === 'lastChild') return Object.entries(currentData).map(([key, value]) => ({ label: String(value), value: String(value) }));
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
        <Box sx={{ py: 1, maxWidth: "500px"}}>
            <Box>Шаг 1. Выбор данных</Box>
            <Box sx={{fontSize: "20px", fontWeight: "600", py: 1}}>Институт</Box>
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
                    options={getOptionsForSelector(data, [
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
                    options={getOptionsForSelector(data, [
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
                    options={getOptionsForSelector(data, [
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
                    options={getOptionsForSelector(data, [
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
                    options={getOptionsForSelector(data, [
                        selectors.faculty.value, 
                        selectors.levelEducation.value, 
                        selectors.directionOfStudy.value, 
                        selectors.profile.value, 
                        selectors.formEducation.value
                    ], 'lastChild')}
                />
            )}
            {/* {selectors.year && (
                <FindRpdTemplates
                    faculty={selectors.faculty}
                    levelEducation={selectors.levelEducation}
                    directionOfStudy={selectors.directionOfStudy}
                    profile={selectors.profile}
                    formEducation={selectors.formEducation}
                    year={selectors.year}
                />
            )} */}
            {selectors.year && (
                <Button variant="outlined" onClick={saveTemplateData}>Продолжить</Button>
            )}
        </Box>
    );
};
export default Selectors;