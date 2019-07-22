import AttendeeController from "./attendee.controller";
import express from "express";

const router = express.Router();

router.post("/attendees", AttendeeController.create);
router.get("/attendees", AttendeeController.find);
router.get("/attendees/:id", AttendeeController.findOne);
router.put("/attendees/:id", AttendeeController.updateAttendee);
router.delete("/attendees/:id",AttendeeController.deleteAttendee);

module.exports = router;
