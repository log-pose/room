import { executeQuery } from "conf/db";

interface MonitorKind {
  kind_name: string;
  required_fields: string;
}

export const getRequiredMonitorParams = async (kind: string) => {
  const query = `SELECT kind_name,required_fields from ServerKind`;
  const result = (await executeQuery(query)) as MonitorKind[];
  const validKinds = result.map((item) => item.kind_name.toLowerCase());
  if (!validKinds.includes(kind.toLowerCase())) {
    console.log(validKinds);
    throw `kind must be one of ${validKinds}`;
  }
  return result
    .find((item) => item.kind_name.toLowerCase() === kind.toLowerCase())
    ?.required_fields?.split(",");
};
