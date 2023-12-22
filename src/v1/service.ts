import { executeQuery, executeQueryWithParams } from "conf/db";
import { randomUUID } from "node:crypto";
import { z } from "zod";

interface MonitorKind {
  kind_name: string;
  required_fields: string;
  kind_id: number;
}

export const getRequiredMonitorParams = async (kind: string) => {
  const query = `SELECT kind_name,required_fields,kind_id from ServerKind`;
  const result = (await executeQuery(query)) as MonitorKind[];
  const validKinds = result.map((item) => item.kind_name.toLowerCase());
  if (!validKinds.includes(kind.toLowerCase())) {
    throw `kind must be one of ${validKinds}`;
  }
  let kindId = result.find(
    (item) => item.kind_name.toLowerCase() === kind.toLowerCase()
  )?.kind_id as number;

  return {
    requiredStr: result
      .find((item) => item.kind_name.toLowerCase() === kind.toLowerCase())
      ?.required_fields?.split(","),
    kindId,
  };
};

interface CreateNewMonitorParams {
  kindId: number;
  userId: string;
  uri?: string | null;
  ip?: string | null;
  port?: number | null;
  serverName: string;
  connectionString?: string | null;
  interval?: number | null;
  retries?: number | null;
}

export const createNewMonitor = async ({
  kindId,
  userId,
  uri = null,
  ip = null,
  port = null,
  serverName,
  connectionString = null,
  interval = 60,
  retries = 3,
}: CreateNewMonitorParams) => {
  if (!kindId || !userId || !serverName) {
    throw "kind, userId, and serverName are required";
  }
  const id = randomUUID();
  z.string().uuid().parse(id);
  const query =
    "INSERT INTO Server (id,kind_id, uri, ip, port, server_name, connection_string, heartbeat_interval, retries, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?,?)";

  await executeQueryWithParams(query, [
    id,
    kindId,
    uri,
    ip,
    port,
    serverName,
    connectionString,
    interval,
    retries,
    userId,
  ]);
};

export const fetchMonitorById = async (id: string) => {
  const query = `SELECT * from Server where id = ?`;
  const result = (await executeQueryWithParams(query, [id])) as any[];
  return result[0];
};

export const fetchAllMonitorByUserId = async (userId: string) => {
  const query = `SELECT * from Server where user_id = ?`;
  const result = (await executeQueryWithParams(query, [userId])) as any[];
  return result;
};

export const deleteMonitor = async (id: string) => {
  const query = `DELETE from Server where id = ?`;
  await executeQueryWithParams(query, [id]);
};

interface UpdateMonitorParams {
  id: string;
  kindId: number;
  uri?: string | null;
  ip?: string | null;
  port?: number | null;
  serverName: string;
  connectionString?: string | null;
  interval?: number;
  retries?: number;
}

export const updateMonitor = async ({
  id,
  kindId,
  uri,
  ip,
  port,
  serverName,
  connectionString,
  interval = 60,
  retries = 3,
}: UpdateMonitorParams) => {
  const query =
    "UPDATE Server SET kind_id = ?, uri = ?, ip = ?, port = ?, server_name = ?, connection_string = ?, heartbeat_interval = ?, retries = ? WHERE id = ?";
  await executeQueryWithParams(query, [
    kindId,
    uri,
    ip,
    port,
    serverName,
    connectionString,
    interval,
    retries,
    id,
  ]);
};
