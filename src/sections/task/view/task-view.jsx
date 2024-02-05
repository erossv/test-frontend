import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import { getTasks } from 'src/redux/actions/taskActions';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import TableNoData from '../table-no-data';
import UserTableRow from '../user-table-row';
import UserTableHead from '../user-table-head';
import TaskUpdateModal from '../task-update-modal';
import TaskCreationModal from '../task-creation-modal';

export default function TaskPage() {
  const dispatch = useDispatch();
  const tasks = useSelector(state => state.task.tasks);
  const totalCount = useSelector(state => state.task.totalCount);

  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(10);
  const [isCreationModalOpen, setIsCreationModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    dispatch(getTasks({ page, pageSize: rowsPerPage }));
  }, [dispatch, page, rowsPerPage]);

  const handleOpenCreationModal = () => {
    setIsCreationModalOpen(true);
  };

  const handleCloseCreationModal = () => {
    setIsCreationModalOpen(false);
  };

  const handleOpenUpdateModal = () => {
    setIsUpdateModalOpen(true);
  };

  const handleOpenMenuCall = (id) => {
    const task = tasks.find((item) => item.id === id)
    setSelectedTask(task);
  };

  const handleCloseUpdateModal = () => {
    setIsUpdateModalOpen(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const notFound = !totalCount;

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Tasks</Typography>

        <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenCreationModal}>
          New Task
        </Button>
      </Stack>

      <Card>
        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <UserTableHead
                headLabel={[
                  { id: 'title', label: 'Title' },
                  { id: 'description', label: 'Desc' },
                  { id: 'date', label: 'EndDate' },
                  { id: 'status', label: 'Status' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {tasks.map((row) => (
                  <UserTableRow
                    key={row.id}
                    id={row.id}
                    title={row.title}
                    description={row.description}
                    endDate={row.endDate}
                    status={row.status}
                    onOpen={handleOpenUpdateModal}
                    onOpenMenuCall={handleOpenMenuCall}
                  />
                ))}

                {notFound && <TableNoData />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>
        <TablePagination
          page={page}
          component="div"
          count={totalCount}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[10]}
        />
        <TaskCreationModal
          open={isCreationModalOpen}
          onClose={handleCloseCreationModal}
        />
        <TaskUpdateModal
          task={selectedTask}
          open={isUpdateModalOpen}
          onClose={handleCloseUpdateModal}
        />
      </Card>
    </Container>
  );
}
