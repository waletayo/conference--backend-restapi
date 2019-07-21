import TalksController from "./talk.controller";
import express from "express";

const router = express.Router();

router.post("/talks", TalksController.create);
router.get("/talks/:id", TalksController.findOne);
router.get("/talks" , TalksController.find);
router.put("/talks/:id", TalksController.update);
router.delete("/talks/:id", TalksController.delete);


module.exports = router;
