import express from "express";
import { setIotData } from "../controllers/iotController.js";
import { getKelasController, getMuridControllerBySingleKelas, addKelasController, editKelasController, deleteKelasController } from "../controllers/kelasController.js";

import { getAbsensi, getAbsensiByKelas, updateDataMurid, getAbsensiByTanggal  } from "../controllers/absensiController.js";

const router = express.Router();

router.post("/iot/set", setIotData);

router.post("/kelas/add", addKelasController);

router.post("/kelas/edit", editKelasController);

router.delete("/kelas/delete/:id", deleteKelasController);

router.get("/kelas/get/:nama_kelas", getMuridControllerBySingleKelas);

router.get("/kelas/all", getKelasController);

router.get("/absensi", getAbsensi);

router.get("/absensi/:kelas", getAbsensiByKelas);

router.get("/absensi/tanggal/:tanggal", getAbsensiByTanggal);

router.post("/murid/edit", updateDataMurid)

export default router;
