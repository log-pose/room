import { Request, Response } from "express";
import {
  createNewMonitor,
  getRequiredMonitorParams,
  fetchMonitorById,
  fetchAllMonitorByUserId,
  deleteMonitor,
  updateMonitor,
} from "./service";
import { z } from "zod";
import { IRequest } from "types";

const createMonitorSchema = z.object({
  kind: z.string(),
  uri: z.string().url({ message: "uri must be a valid url" }),
  ip: z.string().ip(),
  port: z.number(),
  connectionString: z.string(),
  interval: z.number(),
  retries: z.number(),
});
export const createMonitor = async (req: IRequest, res: Response) => {
  try {
    const {
      kind,
      uri,
      ip,
      port,
      serverName,
      connectionString,
      interval,
      retries,
    } = req.body;
    const userId = req.user.id;

    createMonitorSchema.partial().parse({
      uri,
      ip,
      port,
      connectionString,
      interval,
      retries,
    });

    if (!kind) throw new Error("kind is required");

    const { kindId, requiredStr } = await getRequiredMonitorParams(kind);
    requiredStr?.forEach((param) => {
      if (!req.body[param]) throw new Error(`${param} is required`);
    });
    const newMonitor = {
      kindId,
      uri,
      ip,
      port,
      serverName,
      connectionString,
      interval,
      retries,
      userId,
    };

    await createNewMonitor(newMonitor);
    return res.status(201).json({ message: "created" });
  } catch (e: any) {
    return res.status(400).json({ message: "Something went wrong", error: e });
  }
};

export const getMonitorById = async (req: Request, res: Response) => {
  const { id } = req.params;

  z.string().uuid().parse(id);

  const monitor = await fetchMonitorById(id);
  if (!monitor) {
    return res.status(404).json({ message: "Monitor not found" });
  }
  return res.status(200).json({ message: "success", data: monitor });
};
export const getAllMonitors = async (req: Request, res: Response) => {
  res.send("getAllMonitors");
};
export const updateMonitorById = async (req: Request, res: Response) => {
  res.send("updateMonitorById");
};
export const deleteMonitorById = async (req: Request, res: Response) => {
  res.send("deleteMonitorById");
};
