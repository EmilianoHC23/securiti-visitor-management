const Visit = require('../models/Visit');
const Appointment = require('../models/Appointment');

// @desc    Check-in a visitor
// @route   POST /api/visits/check-in
// @access  Private
exports.checkIn = async (req, res, next) => {
  try {
    const { appointmentId } = req.body;
    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) {
      return res.status(404).json({ msg: 'Appointment not found' });
    }

    const newVisit = new Visit({
      appointment: appointmentId,
      checkInTime: new Date()
    });

    await newVisit.save();

    appointment.status = 'Checked-in';
    await appointment.save();

    res.status(201).json({ success: true, data: newVisit });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc    Check-out a visitor
// @route   POST /api/visits/check-out/:id
// @access  Private
exports.checkOut = async (req, res, next) => {
  try {
    const visit = await Visit.findOne({ appointment: req.params.id, checkOutTime: null });

    if (!visit) {
      return res.status(404).json({ msg: 'Active visit not found' });
    }

    visit.checkOutTime = new Date();
    await visit.save();

    const appointment = await Appointment.findById(req.params.id);
    appointment.status = 'Checked-out';
    await appointment.save();

    res.status(200).json({ success: true, data: visit });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
