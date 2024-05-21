import { useState, useEffect, SyntheticEvent, FC } from 'react';
import { Link } from 'react-router-dom';
import useStore from '../../store/useStore';
import { Tab, Tabs} from '@mui/material';
import { BorderColor, Description, ListAlt } from '@mui/icons-material';
import Can from '../../ability/Can';

const HeaderNavbar: FC = () => {
    const { jsonData } = useStore();
    const [value, setValue] = useState<string>(location.pathname);
    const [isTeacherInterface, setIsTeacherInterface] = useState<boolean>(true);

    useEffect(() => {
        Object.keys(jsonData).length ? setIsTeacherInterface(false) : setIsTeacherInterface(true);
    }, [jsonData]);

    const handleChange = (event: SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <Tabs
            value={value}
            onChange={handleChange}
            aria-label="navbar"
        >
            <Can I="get" a="rop_interface">
                <Tab
                    label="Интерфейс РОП"
                    icon={<ListAlt />}
                    iconPosition="end"
                    component={Link}
                    to="/manager"
                    value="/manager"
                />
            </Can>
            <Can I="get" a="teacher_interface">
                <Tab
                    label="Интерфейс преподавателя"
                    icon={<Description />}
                    iconPosition="end"
                    component={Link}
                    to="/teacher-interface"
                    value="/teacher-interface"
                    disabled={isTeacherInterface}
                />
            </Can>
            <Can I="get" a="change_templates">
                <Tab
                    label="Шаблон РПД"
                    icon={<BorderColor />}
                    iconPosition="end"
                    component={Link}
                    to="/rpd-template"
                    value="/rpd-template"
                />
            </Can>
        </Tabs>
    )
}

export default HeaderNavbar;