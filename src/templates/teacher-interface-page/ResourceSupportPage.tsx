import { FC } from 'react';
import JsonChangeValue from './changeable-elements/JsonChangeValue';
import { Box } from '@mui/material';

const ResourceSupportPage: FC = () => {
    return (
        <Box>
            <Box component='h2'>Ресурсное обеспечение</Box>
            <Box component='h4' sx={{ pt: 2, pb: 1 }}>Перечень литературы</Box>

            <Box sx={{
                p: 1,
                border: '1px dashed grey',
                my: 1,
                '& ol': {
                    p: 1
                },
                '& li': {
                    ml: "60px",
                },
                '& p': {
                    p: 1
                }
            }}>
                <Box component='h4' sx={{ pb: 2, pt: 1 }}>Основная литература</Box>
                <JsonChangeValue elementName='textbook'/>
            </Box>

            <Box sx={{
                p: 1,
                border: '1px dashed grey',
                my: 1,
                '& ol': {
                    p: 1
                },
                '& li': {
                    ml: "60px",
                },
                '& p': {
                    p: 1
                }
            }}>
                <Box component='h4' sx={{ py: 1 }}>Дополнительная литература</Box>
                <JsonChangeValue elementName='additional_textbook'/>
            </Box>

            <Box sx={{
                p: 1,
                border: '1px dashed grey',
                my: 1,
                '& ol': {
                    p: 1
                },
                '& li': {
                    ml: "60px",
                },
                '& p': {
                    p: 1
                }
            }}>
                <Box component='h4' sx={{ py: 1 }}>Профессиональные базы данных и информационные справочные системы</Box>
                <JsonChangeValue elementName='professional_information_resources'/>
            </Box>

            <Box sx={{
                p: 1,
                border: '1px dashed grey',
                my: 1,
                '& ol': {
                    p: 1
                },
                '& li': {
                    ml: "60px",
                },
                '& p': {
                    p: 1
                }
            }}>
                <Box component='h4' sx={{ py: 1 }}>Необходимое программное обеспечение</Box>
                <JsonChangeValue elementName='software'/>
            </Box>

            <Box sx={{
                p: 1,
                border: '1px dashed grey',
                my: 1,
                '& ul': {
                    p: 1
                },
                '& li': {
                    ml: "60px",
                },
                '& p': {
                    p: 1
                }
            }}>
                <Box component='h4' sx={{ py: 1 }}>Необходимое материально-техническое обеспечение</Box>
                <JsonChangeValue elementName='logistics_template'/>
            </Box>
            

        </Box>
    );
}

export default ResourceSupportPage;