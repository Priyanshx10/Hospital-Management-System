const Appointment = require("../models/Appointment");

exports.bookAppointment = async (req, res) => {
  try {
    const { patient, doctor, date } = req.body;
    const appointment = new Appointment({ patient, doctor, date });
    await appointment.save();
    res.json(appointment);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.cancelAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({ msg: "Appointment not found" });
    }
    appointment.status = "cancelled";
    await appointment.save();
    res.json(appointment);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().populate(
      "patient doctor",
      "name email"
    );
    res.json(appointments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
