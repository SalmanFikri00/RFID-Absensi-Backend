import express from "express";
import { setIotData } from "../controllers/iotController.js";
import { getKelasController, getMuridControllerBySingleKelas, addKelasController, editKelasController, deleteKelasController } from "../controllers/kelasController.js";
const router = express.Router();

router.post("/iot/set", setIotData);

router.post("/kelas/add", addKelasController);

router.post("/kelas/edit", editKelasController);

router.post("/kelas/delete", deleteKelasController);

router.get("/kelas/get/:nama_kelas", getMuridControllerBySingleKelas);

router.get("/kelas/all", getKelasController);

export default router;
