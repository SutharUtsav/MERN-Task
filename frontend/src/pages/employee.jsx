import { Helmet } from 'react-helmet-async';

import { EmployeeView } from '../sections/employee/view';
import { EmployeeUploadFormView } from '../sections/employee/upload';
import { useState } from 'react';
import { Modal } from '@mui/material';

// ----------------------------------------------------------------------

export default function UserPage() {

  const [open, setOpen] = useState(false);

  const handleClose = () => {
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

      <EmployeeView handleOpen={handleOpen}/>

      <Modal
        open={open}
        onClose={handleClose}
        title="Upload Employees Sheet"
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <EmployeeUploadFormView />
      </Modal>
    </>
  );
}
