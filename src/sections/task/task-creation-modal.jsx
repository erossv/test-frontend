import dayjs from "dayjs"
import { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { Box, Modal, Button, Select, MenuItem, TextField, Typography, InputLabel, FormControl } from '@mui/material';

import { createTask } from 'src/redux/actions/taskActions';

const TaskCreationModal = ({ open, onClose }) => {
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        endDate: dayjs().format("YYYY-MM-DD"),
        status: '',
    });

    const handleChange = (field) => (e) => {
        const { value } = e.target;

        setFormData({
            ...formData,
            [field]: value,
        });
    };

    const handleCreateTask = async () => {
        if (!formData.title || !formData.description || !formData.endDate || !formData.status) {
            alert('Please fill in all fields.');
            return;
        }

        try {
            await dispatch(createTask(formData));
        } catch (error) {
            console.error('Login failed:', error);
        }

        onClose();
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                    minWidth: 400,
                }}
            >
                <Typography variant="h6" gutterBottom>
                    Create Task
                </Typography>
                <TextField
                    label="Title"
                    fullWidth
                    margin="normal"
                    value={formData.title}
                    onChange={handleChange('title')}
                />
                <TextField
                    label="Description"
                    fullWidth
                    multiline
                    rows={4}
                    margin="normal"
                    value={formData.description}
                    onChange={handleChange('description')}
                />
                <TextField
                    label="End Date"
                    fullWidth
                    type="date"
                    margin="normal"
                    value={formData.endDate}
                    onChange={handleChange('endDate')}
                />
                <FormControl fullWidth margin="normal">
                    <InputLabel>Status</InputLabel>
                    <Select
                        value={formData.status}
                        onChange={handleChange('status')}
                    >
                        <MenuItem value="pending">Pending</MenuItem>
                        <MenuItem value="done">Done</MenuItem>
                    </Select>
                </FormControl>
                <Button variant="contained" color="primary" onClick={handleCreateTask}>
                    Create
                </Button>
            </Box>
        </Modal>
    );
};

TaskCreationModal.propTypes = {
    open: PropTypes.bool,
    onClose: PropTypes.func,
};

export default TaskCreationModal;
