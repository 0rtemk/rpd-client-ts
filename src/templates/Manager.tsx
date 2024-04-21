import Selectors from "./manager-template-page/Selectors";
import TemplateConstructor from "./manager-template-page/TemplateConstructor";
import JsonParser from "../store/JsonParser";
import { Container, Box } from '@mui/material';
import { useState } from "react";


//тут вообще свалка пока
export default function Manager() {
    const [choise, setChoise] = useState<string>("selectData");

    return (
        <Container
            maxWidth="xl"
            sx={{
                display: 'flex',
                justifyContent: 'space-between'
            }}
        >

            <JsonParser profileServerKey="ivt_bakalavr" />

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
            </Box>
        </Container>
    );
}