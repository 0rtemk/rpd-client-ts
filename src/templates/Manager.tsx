import Selectors from "./manager-template-page/Selectors";
import TemplateConstructor from "./manager-template-page/TemplateConstructor";
import { Container, Box } from '@mui/material';
import { FC, useState } from "react";
import ChangeRpdTemplate from "./manager-template-page/steps/ChangeRpdTemplate";
import CreateRpdTemplateFromYear from "./manager-template-page/steps/CreateRpdTemplateFromYear";
import CreateRpdTemplateFrom1CExchange from "./manager-template-page/steps/CreateRpdTemplateFrom1CExchange";

export const Manager: FC = () => {
    const [choise, setChoise] = useState<string>("selectData");

    return (
        <Container
            maxWidth="xl"
            sx={{
                display: 'flex',
                justifyContent: 'space-between'
            }}
        >
            <Box
                my={4}
                p={2}
                ml={2}
                sx={{
                    backgroundColor: '#fefefe',
                    width: "100%"
                }}
            >
                
                <Box component='h2' sx={{ py: 1 }}>Подготовка комплекта РПД функционал РОП</Box>
                {choise === "selectData" && (
                    <Selectors setChoise={setChoise}/>
                )}
                {choise === "workingType" && (
                    <TemplateConstructor setChoise={setChoise} />
                )}
                {choise === "changeTemplate" && (
                    <ChangeRpdTemplate setChoise={setChoise} />
                )}
                {choise === "createTemplateFromCurrentYear" && (
                    <CreateRpdTemplateFromYear setChoise={setChoise} />
                )}
                {choise === "createTemplateFromExchange" && (
                    <CreateRpdTemplateFrom1CExchange setChoise={setChoise} />
                )}
            </Box>
        </Container>
    );
}