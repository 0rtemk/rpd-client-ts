export const selectorOptions = {
    workType: [
        { label: 'Создание нового шаблона РПД', value: 'create' },
        { label: 'Редактирование существующего шаблона РПД', value: 'edit' },
    ],
    creationType: [
        { label: 'На основе выгрузки 1C', value: '1c' },
        { label: 'На основе шаблона выбранного года', value: 'currentYearTemplate' },
        { label: 'На основе шаблона другого института', value: 'otherInstituteTemplate' },
    ],
    institute: [
        { label: 'Институт системного анализа и управления', value: 'ISAU' },
        { label: 'Инженерно физический институт', value: 'EFI' },
        { label: 'Факультет социальных и гуманитарных наук', value: 'FSHS' },
        { label: 'Факультет естественных и инженерных наук', value: 'FNES' },
    ],
};
