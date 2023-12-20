import { Router } from "express";
import {
  createMonitor,
  deleteMonitorById,
  getAllMonitors,
  getMonitorById,
  updateMonitorById,
} from "./controller";
const router = Router();

router.post("/", createMonitor);
router.get("/", getAllMonitors);
router.get("/:id", getMonitorById);
router.put("/:id", updateMonitorById);
router.delete("/:id", deleteMonitorById);

export default router;
