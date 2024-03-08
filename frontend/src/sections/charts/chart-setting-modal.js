import { Box, Button, FormControl, FormLabel, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { getByQueryParams } from "../../service/api-service";
import PropTypes from 'prop-types';

// ----------------------------------------------------------

export function ChartSettingModal({closeChartModal}) {

    const defaultChartSettingForm = {
        selectedField: null,
        customization: {
            sortBy: "asc",
            filterBy: {
                value: ""
            }
        }
    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        bgcolor: 'background.paper',
        border: '1px solid #000',
        borderRadius: "8px",
        boxShadow: 5,
        p: 4,
    };

    const [chartSettingForm, setChartSettingForm] = useState(defaultChartSettingForm);
    const [chartType, setChartType] = useState("pie");

    const handleGenerateChartData = (e) => {
        e.preventDefault();

        console.log(chartSettingForm)
        console.log(chartType)


        getByQueryParams('/chart', chartSettingForm)
            .then((response) => {
                console.log(response)
            })
            .catch((error) => {
                console.log(error)
            })
            .finally(()=>{
                setChartSettingForm(defaultChartSettingForm)
                setChartType("pie")
            })

    }

    return (
        <>
            <Box sx={style} >
                <Box container spacing={3} >
                    <Typography variant="h5" >Chart Settings</Typography>

                    <FormControl sx={{ mt: 3, minWidth: "100%" }} size="small">
                        <InputLabel id="demo-select-small-label">Select Chart Type</InputLabel>
                        <Select
                            labelId="demo-select-small-chart-label"
                            id="demo-select-chart-small"
                            value={chartSettingForm.selectedField}
                            label="Select Chart-Type"
                            value={chartType}
                            onChange={(e) => {
                                setChartType(e.target.value)
                            }}
                        >
                            <MenuItem value={"pie"}>Pie Chart</MenuItem>
                            <MenuItem value={"bar"}>Bar Chart</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl sx={{ mt: 3, minWidth: "100%" }} size="small">
                        <InputLabel id="demo-select-small-label">Select Field</InputLabel>
                        <Select
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            value={chartSettingForm.selectedField}
                            label="Select Field"
                            onChange={(e) => {
                                setChartSettingForm({
                                    ...chartSettingForm,
                                    selectedField: e.target.value
                                })
                            }}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={"salary"}>Salary</MenuItem>
                            <MenuItem value={"status"}>Status</MenuItem>
                            <MenuItem value={"address"}>Address</MenuItem>
                            <MenuItem value={"skills"}>Skills</MenuItem>
                        </Select>
                    </FormControl>

                    <Box sx={{ mt: 3 }}  >
                        <Typography variant="span">Customization</Typography>

                        <FormControl sx={{ mt: 2, minWidth: "100%" }} size="small">
                            <InputLabel id="demo-select-small-sort-label">Sort</InputLabel>
                            <Select
                                labelId="demo-select-small-sort-label"
                                id="demo-select-small-sort"
                                value={chartSettingForm.customization.sortBy}
                                label="Sort"
                                onChange={(e) => {
                                    setChartSettingForm({
                                        ...chartSettingForm,
                                        customization: {
                                            sortBy: e.target.value,
                                            filterBy: {
                                                value: chartSettingForm.customization.filterBy.value
                                            }
                                        }
                                    })
                                }}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={"asc"}>Asc</MenuItem>
                                <MenuItem value={"desc"}>Desc</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl sx={{ mt: 2, minWidth: "100%" }} size="small">
                            <InputLabel id="demo-select-small-filter-label">Filter</InputLabel>
                            <TextField type="text"
                                labelId="demo-select-small-filter-label"
                                id="demo-select-small-filter"
                                value={chartSettingForm.customization.filterBy.value} onChange={(e) => {
                                    setChartSettingForm({
                                        ...chartSettingForm,
                                        customization: {
                                            sortBy: chartSettingForm.customization.sortBy,
                                            filterBy: {
                                                value: e.target.value
                                            }
                                        }
                                    })
                                }} />
                        </FormControl>

                        <Button variant="contained" color="primary" onClick={handleGenerateChartData}>Generate Chart</Button>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

ChartSettingModal.propType ={
    closeChartModal : PropTypes.func
  }