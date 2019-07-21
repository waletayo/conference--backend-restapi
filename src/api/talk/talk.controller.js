"use strict";
import Talks from "./talk.model";
import talkValidator from "../../validator/talk";
import {BAD_REQUEST, CREATED, DELETED, INTERNAL_SERVER_ERROR, OK} from "../../util/status-codes";

exports.create = (req, res, next) => {

    const {errors, isValid} = talkValidator(req.body);
    if (!isValid) {
        return res.status(BAD_REQUEST).json({
            success: false,
            code: 400,
            error: errors
        });
    }
    let talkBody = req.body;
    const talk = new Talks(talkBody);
    talk.save()
        .then(save_talk => {
            if (!save_talk) {
                return res.status(BAD_REQUEST).json({
                    success: false,
                    code: 400,
                    message: "unable to create talk please try again later"
                })
            } else {
                return res.status(CREATED).json({
                    success: true,
                    code: 201,
                    message: "created talk saved sucessfully ",
                    data: save_talk
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


exports.update = (req, res, next) => {
    const id = req.params.id;
    const updateObject = req.body;
    Talks.findByIdAndUpdate({_id: id}, {$set: updateObject})
        .then(talk => {
            if (!talk) {
                return res.status(BAD_REQUEST).json({
                    success: false,
                    code: 400,
                    message: "no talk with the provided id"
                })
            } else {
                return res.status(OK).json({
                    success: true,
                    code: 200,
                    message: "talk updated successfully ",
                    updated_talk: talk
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

exports.findOne = (req, res, next) => {
    Talks.findById({_id: req.params.id})
        .then(talk => {
            if (!talk) {
                return res.status(BAD_REQUEST).json({
                    success: false,
                    code: 400,
                    message: "no talk witht this id "
                })
            } else {
                return res.status(OK).json({
                    success: true,
                    code: 200,
                    message: "fecth talk  sucessfully",
                    _talk: talk
                })
            }
        }).catch(error => {
        return res.status(INTERNAL_SERVER_ERROR).json({
            success: false,
            code: 500,
            message: "server error message",
            server_error: error
        })
    })
};

exports.find = (req, res, next) => {
    Talks.find()
        .then(talks => {
            if (!talks) {
                return res.status(BAD_REQUEST).json({
                    success: false,
                    code: 400,
                    message: "oops! unable to fecth talks"
                })
            } else {
                return res.status(OK).json({
                    success: true,
                    code: 200,
                    message: "Successfully fetched",
                    data: talks
                });
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
    Talks.findByIdAndDelete({_id: req.params.id})
        .then(delete_talk => {
            if (!delete_talk) {
                return res.status(BAD_REQUEST).json({
                    success: false,
                    code: 400,
                    message: "unable to delete talk",

                })
            } else {
                return res.status(OK).json({
                    success: true,
                    code: 200,
                    message: "Talk deleted sucessfully",
                    deleted_talk: delete_talk
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

