import { useState, useEffect, FC } from 'react';
import { ActionMeta, SingleValue } from 'react-select';
import Select from 'react-select';
import Selector from './Selector';
import FindRpdTemplates from './FindRpdTemplates';
import Loader from '../../helperComponents/Loader';
import { Box } from '@mui/material';

interface OptionType {
    label: string;
    value: string;
}

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

const Selectors: FC = () => {
    const [selectors, setSelectors] = useState<SelectorsState>({
        faculty: undefined,
        levelEducation: undefined,
        directionOfStudy: undefined,
        profile: undefined,
        formEducation: undefined,
        year: undefined
    });

    const [data, setData] = useState<Nullable<JsonData>>(undefined);

    useEffect(() => {
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

        fetchData();
    }, []);

    const handleChange = (name: keyof SelectorsState) => (
        selectedOption: SingleValue<OptionType>,
        actionMeta: ActionMeta<OptionType>
      ) => {
        console.log(`Action: ${actionMeta.action}`);
      
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

    const getOptionsForSelector = (data: JsonData, selectorPath: Array<string>, indicator?: string): OptionType[] => {
        let currentData = data;

        for (const key of selectorPath) {
            currentData = currentData[key] as JsonData;
            if (!currentData) {
                return [];
            }
        }

        console.log(currentData);
        if(indicator && indicator === 'lastChild') return Object.entries(currentData).map(([key, value]) => ({ label: String(value), value: String(value) }));
        return Object.keys(currentData).map(key => ({ label: key, value: key }));
    };

    if (!data) return <Loader />

    return (
        <>
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
        </>
    );
};
export default Selectors;