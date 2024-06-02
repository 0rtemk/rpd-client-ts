import { ChangeEvent, FC, useState } from 'react';
import { MenuItem, Select } from '@mui/material';
import useStore from '../../../store/useStore';
import axios from 'axios';
import showSuccessMessage from '../../../utils/showSuccessMessage';
import showErrorMessage from '../../../utils/showErrorMessage';

// Типы данных для ваших props
interface SelectorProps {
    certification: string;
}

const CertificationSelector: FC<SelectorProps> = ({ certification }) => {
    const [valueCertification, setValueCertification] = useState<string>(certification);
    const { updateJsonData } = useStore();

    const handleChange = async (event: ChangeEvent<HTMLSelectElement>) => {
        const templateId = useStore.getState().jsonData.id;
        const value = event.target.value;

        try {
            await axios.put(`/api/update-json-value/${templateId}`, {
                fieldToUpdate: "certification",
                value: value
            });

            showSuccessMessage('Данные успешно сохранены');
            updateJsonData("certification", value);
            setValueCertification(value);
        } catch (error) {
            showErrorMessage('Ошибка сохранения данных');
        }
    };

    return (
        <Select
            labelId="certification-select-label"
            id="certification-select"
            value={valueCertification}
            //@ts-expect-error
            onChange={handleChange}
            size="small"
        >
            <MenuItem value="Зачет">зачет</MenuItem>
            <MenuItem value="Зачет с оценкой">зачет с оценкой</MenuItem>
            <MenuItem value="Экзамен">экзамен</MenuItem>
        </Select>
    );
}
export default CertificationSelector;