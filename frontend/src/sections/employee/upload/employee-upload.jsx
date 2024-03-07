import React, { useState } from "react";

import { Box, Button, Grid, Paper, Typography } from "@mui/material";

export default function EmployeeUploadFormView() {
    const [files, setFiles] = useState([]);

    const handleFileChange = (e) => {
        setFiles(e.target.files)
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("submit")

    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    
    return (
        <Box sx={style} >
            <Box container spacing={3} >
                <Box item xs={12} sm={6} md={4} p={5}>
                    
                        <Typography variant="h4" >Upload Employee Excel Data</Typography>
                        <form onSubmit={handleSubmit}>

                        <input type="file" onChange={handleFileChange} style={{"marginTop":"5px"}}/>
                        <Button variant="contained" color="primary" type="submit" >Upload Button</Button>
                        </form>
                    
                </Box>

                <Box item xs={12} sm={6} md={8} mt={3} p={5}>
                    
                        <Typography variant="h4">Instructions</Typography>
                        <ul>
                            <li>The file should be an Excel file with the following columns:</li>
                            <li>Employee ID</li>
                            <li>Employee Name</li>
                            <li>Employee Email</li>
                            <li>Employee Phone Number</li>
                            <li>Employee Address</li>
                            <li>Employee City</li>
                            <li>Employee State</li>
                            <li>Employee Zip Code</li>
                            <li>Employee Country</li>
                            <li>Employee Start Date</li>
                            <li>Employee End Date</li>
                        </ul>
                    
                </Box>
            </Box>
        </Box>
    )
}