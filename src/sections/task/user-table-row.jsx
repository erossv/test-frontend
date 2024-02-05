import { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';

import { deleteTask } from 'src/redux/actions/taskActions';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';

export default function UserTableRow({
  id,
  title,
  description,
  endDate,
  status,
  onOpen,
  onOpenMenuCall
}) {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(null);

  const handleOpenMenu = (event) => {
    onOpenMenuCall(id);
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleDeleteClick = async () => {
    dispatch(deleteTask(id));
    handleCloseMenu();
  };

  const handleOpenUpdateModel = () => {
    onOpen();
    setOpen(null);
  }

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" >
        <TableCell>{title}</TableCell>

        <TableCell>{description}</TableCell>

        <TableCell>{endDate}</TableCell>

        <TableCell>
          <Label color={(status === 'pending' && 'warning') || 'success'}>{status}</Label>
        </TableCell>

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
        <MenuItem onClick={handleOpenUpdateModel}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem onClick={handleDeleteClick} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}

UserTableRow.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  endDate: PropTypes.string,
  status: PropTypes.string,
  onOpen: PropTypes.func,
  onOpenMenuCall: PropTypes.func
};
