import express from 'express';
import Appointment from '../models/Appointment.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/', auth, async (req, res) => {
  try {
    const appointment = new Appointment({
      ...req.body,
      patient: req.user._id,
    });
    await appointment.save();
    res.status(201).send(appointment);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const appointments = await Appointment.find({ patient: req.user._id })
      .populate('doctor', 'name')
      .populate('patient', 'name');
    res.send(appointments);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.patch('/:id/cancel', auth, async (req, res) => {
  try {
    const appointment = await Appointment.findOne({
      _id: req.params.id,
      patient: req.user._id,
    });
    if (!appointment) {
      return res.status(404).send({ message: 'Appointment not found' });
    }
    appointment.status = 'cancelled';
    await appointment.save();
    res.send(appointment);
  } catch (error) {
    res.status(400).send(error);
  }
});

export default router;

