import { Router } from "express";
import {
  createMonitor,
  deleteMonitorById,
  getAllMonitorsForUser,
  getMonitorById,
  updateMonitorById,
} from "./controller";
import { verifyToken } from "middleware";
const router = Router();

router.post("/", verifyToken, createMonitor);
router.get("/", verifyToken, getAllMonitorsForUser);
router.get("/:id", verifyToken, getMonitorById);
router.put("/:id", verifyToken, updateMonitorById);
router.delete("/:id", verifyToken, deleteMonitorById);

export default router;
