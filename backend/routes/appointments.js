const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointments');

// GET all appointments
router.get('/', appointmentController.getAllAppointments);

// POST a new appointment
router.post('/', appointmentController.createAppointment);

// GET a single appointment by ID
router.get('/:id', appointmentController.getAppointmentById);

// PUT to update an appointment by ID
router.put('/:id', appointmentController.updateAppointment);

// DELETE an appointment by ID
router.delete('/:id', appointmentController.deleteAppointment);

module.exports = router;
