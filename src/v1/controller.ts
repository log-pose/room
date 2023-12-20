import { Request, Response } from "express";
import { createNewMonitor, getRequiredMonitorParams } from "./service";
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
      kind,
      uri,
      ip,
      port,
      serverName,
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
    return res.status(400).json({ message: e });
  }
};

export const getMonitorById = async (req: Request, res: Response) => {
  res.send("getMonitorById");
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
