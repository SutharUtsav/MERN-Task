import { useState } from 'react';
import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import Label from '../../components/label';
import Iconify from '../../components/iconify';
import { useDate } from '../../hooks/use-date-format'

// ----------------------------------------------------------------------

export default function EmployeeTableRow({
  selected,
  name,
  status,
  joiningDate,
  birthDate,
  skills,
  salary,
  city,
  address,
  mobileNo,
  uanNo,
  handleClick
}) {
  const [open, setOpen] = useState(null);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>

        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            
            <Typography variant="subtitle2" noWrap>
              {name}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>{status}</TableCell>

        <TableCell>{useDate(joiningDate)}</TableCell>
        
        <TableCell>{useDate(birthDate)}</TableCell>
        
        <TableCell>{skills.join(', ')}</TableCell>
        
        <TableCell>{salary}</TableCell>

        <TableCell>{city}</TableCell>

        <TableCell>{address}</TableCell>

        <TableCell>{mobileNo}</TableCell>

        <TableCell>{uanNo}</TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem onClick={handleCloseMenu}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem onClick={handleCloseMenu} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}

EmployeeTableRow.propTypes = {
  handleClick: PropTypes.func,
  name: PropTypes.any,
  status: PropTypes.string,
  joiningDate: PropTypes.any,
  birthDate: PropTypes.any,
  skills: PropTypes.array,
  salary: PropTypes.any,
  address: PropTypes.any,
  mobileNo: PropTypes.any,
  uanNo: PropTypes.any,
};
