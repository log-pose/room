import { Router } from "express";
import roomRouterV1 from "../src/v1/routes";
import { verifyToken } from "middleware";
const router = Router();

router.use("/v1", roomRouterV1);

export default router;
