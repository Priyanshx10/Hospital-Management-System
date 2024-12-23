const express = require("express");
const router = express.Router();
const {
  bookAppointment,
  cancelAppointment,
  getAppointments,
} = require("../controllers/appointmentController");

router.post("/", bookAppointment);
router.put("/:id", cancelAppointment);
router.get("/", getAppointments);

module.exports = router;
