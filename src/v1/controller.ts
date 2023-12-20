import { Request, Response } from "express";
import { getRequiredMonitorParams } from "./service";

export const createMonitor = async (req: Request, res: Response) => {
  try {
    const { kind } = req.body;
    if (!kind) {
      throw "kind is required";
    }
    const monitorParams = await getRequiredMonitorParams(kind);
    monitorParams?.forEach((param) => {
      if (!req.body[param]) {
        throw `${param} is required`;
      } else {
        console.log(req.body[param]);
      }
    });
  } catch (e) {
    res.status(400).json({
      message: e,
    });
  }
  res.send("createMonitor");
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
