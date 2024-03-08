
// -----------------------------------------

import { Box, Button, Container, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { bulkInsert, post } from "../../service/api-service";
import { useNavigate } from "react-router-dom";

export default function EmployeeCreatePage() {

    const navigate = useNavigate();
    const [file, setFiles] = useState(null);

    const handleFileChange = (e) => {
        setFiles(e.target.files[0])
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(file)

        if(!file){
            console.log("Error : File not selected")
        }
        else{
            bulkInsert("/employee/upload-data", {
                excelSheet: file
            })
            .then(response => {
                console.log(response);
                if(response.data.status){
                    console.log("success")
                    navigate('/employee')
                }
            })    
            .catch((error) => {
                    console.log("Error", error)
            })
        }

    }

    return (
        <>
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4"> Create Employees</Typography>
                </Stack>


                <Box>
                    <Box container spacing={3} >
                        <Box item xs={12} sm={6} md={4} mt={2}>

                            <Typography variant="h5" >Upload Employee Excel Data</Typography>
                            <form >
                                <Box sx={{ m: 2 }}>
                                    <TextField type="file" onChange={handleFileChange} fullWidth />
                                    <Button variant="contained" color="primary" component="span" type="submit" sx={{ mt: 1 }} onClick={handleSubmit}>
                                        Upload
                                    </Button>
                                </Box>
                            </form>

                        </Box>

                        <Box item xs={12} sm={6} md={8} mt={1} fontSize={"0.85rem"}>

                            <Typography variant="h6">Instructions</Typography>
                            <ul>
                                <li>The file should be an Excel file with the following columns respectively:</li>
                                <li>Name, Salary, Status, Joining Date, BirthDate, Address, Skills, MobileNo, UAN No, City</li>
                                <li>First line should be headers</li>
                                <li>Date fields should be in MM-dd-yyyy format</li>
                                <li>Reference link: <a href="https://docs.google.com/spreadsheets/d/1hm_oc2jFITsSHOrfFWp7UZjVjdmi-nOo/edit?usp=drive_link&ouid=111445290030476464738&rtpof=true&sd=true">Example of a Sheet</a></li>
                            </ul>

                        </Box>
                    </Box>
                </Box>

            </Container>
        </>
    )
}