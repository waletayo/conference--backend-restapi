import Attendees from "./attendee.model";
import _ from "underscore"
import {BAD_REQUEST, CREATED, INTERNAL_SERVER_ERROR, OK} from "../../util/status-codes";
import attendeeValidator from "../../validator/attendee";


exports.create = (req, res, next) => {
    console.log('req body:', req.body);
    const {errors, isValid} = attendeeValidator(req.body);
    if (!isValid) {
        return res.status(BAD_REQUEST).json({
            success: false,
            code: 400,
            error: errors
        });
    }
    let attendeBody = req.body;
    _.extend(attendeBody, {talk: req.body.talk});
    const newAttendee = new Attendees(attendeBody);
    newAttendee.save()
        .then(save_attendee => {
            if (!save_attendee) {
                return res.status(BAD_REQUEST).json({
                    success: false,
                    code: 400,
                    message: "oops! there is an error",
                })
            } else {
                return res.status(CREATED).json({
                    success: true,
                    code: 201,
                    message: "attendee created sucessfully",
                    saved_attendee: save_attendee
                })
            }

        }).catch(error => {
        return res.status(INTERNAL_SERVER_ERROR).json({
            success: false,
            code: 500,
            server_error: error
        });
    });
};


exports.findOne = (req, res, next) => {
    Attendees.findById({_id: req.params.id})
        .populate("talk")
        .then(attendee => {
            if (!attendee) {
                return res.status(BAD_REQUEST).json({
                    success: false,
                    code: 400,
                    message: "No attendee found with this id",
                })
            } else {
                return res.status(OK).json({
                    success: true,
                    code: 200,
                    message: "fecth attendee sucessfully",
                    found_attendee: attendee
                })
            }
        }).catch(error => {
        return res.status(INTERNAL_SERVER_ERROR).json({
            success: false,
            code: 500,
            server_error: error
        })
    })
};


exports.find = (req, res, next) => {
    Attendees.find()
        .populate({path: 'talk', select: 'title'})
        .then(attendees => {
            if (!attendees) {
                return res.status(BAD_REQUEST).json({
                    success: false,
                    code: 400,
                    message: "unable to fecth attendee",
                })
            } else {
                return res.status(OK).json({
                    success: true,
                    code: 200,
                    message: "fecth attendees sucessfully",
                    data: attendees
                })
            }
        }).catch(error => {
        return res.status(INTERNAL_SERVER_ERROR).json({
            success: false,
            code: 500,
            server_error: error
        })
    });
};

exports.update = (req, res, next) => {
    const id = req.params.id;
    const updateObject = req.body;
    Attendees.findByIdAndUpdate({_id: id}, {$set: updateObject})
        .then(update_attendee => {
            if (!update_attendee) {
                return res.status(BAD_REQUEST).json({
                    success: false,
                    code: 400,
                    message: "NO  attendee with this id ",
                })
            } else {
                return res.status(OK).json({
                    success: true,
                    code: 200,
                    message: " getting attendee sucessfully",
                    found_attendee: update_attendee
                })
            }
        }).catch(error => {
        return res.status(INTERNAL_SERVER_ERROR).json({
            success: false,
            code: 500,
            server_error: error
        })
    })
};


exports.delete = (req, res, next) => {
    Attendees.findByIdAndDelete({id: req.params.id})
        .then(deleted_attendee => {
            if (!deleted_attendee) {
                return res.status(BAD_REQUEST).json({
                    success: false,
                    code: 400,
                    message: "id not found",
                })
            } else {
                return res.status(OK).json({
                    success: true,
                    code: 200,
                    message: "attendee deleted sucessfully",
                    found_attendee: deleted_attendee
                })
            }
        })
};
