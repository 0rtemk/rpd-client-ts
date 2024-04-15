import { useState } from 'react';

const Selector = ({title, options, onSelect }) => {
    const [selectedOption, setSelectedOption] = useState('');

    const handleSelect = (event) => {
        const value = event.target.value;
        setSelectedOption(value);
        onSelect(value);
    };

    if(options.length == 0) return (
        <div>
            <h3>{title}</h3>
            <div className='error-message'>Ошибка загрузки данных. Выберите другие опции или обратитесь к администатору</div>
        </div>
    );

    return (
        <div>
            <h3>{title}</h3>
            <select className='selector' value={selectedOption} onChange={handleSelect}>
                <option value="">Выберите</option>
                {options.map(option => (
                    <option key={option} value={option}>{option}</option>
                ))}
            </select>
        </div>
    );
};

export default Selector;