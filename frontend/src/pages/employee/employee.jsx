import { Helmet } from 'react-helmet-async';

import { EmployeeView } from '../../sections/employee/view';
import { EmployeeUploadFormView } from '../../sections/employee/upload';
import { useState } from 'react';
import { Modal } from '@mui/material';
import { ChartSettingModal } from '../../sections/charts/chart-setting-modal';

// ----------------------------------------------------------------------

export default function EmployeePage() {

  const [open, setOpen] = useState(false);

  const handleClose = ()=> {
    setOpen(false)
  }

  const handleOpen = () => {
    setOpen(true)
  }
  return (
    
    <>
      <Helmet>
        <title> Employee </title>
      </Helmet>

      <EmployeeView openChartModal={handleOpen}/>

      <Modal
        open={open}
        onClose={handleClose}
        title="Upload Employees Sheet"
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ChartSettingModal closeChartModal={handleClose}/>
      </Modal>

      
    </>
  );
}
