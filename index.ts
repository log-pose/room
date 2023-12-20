import logger from "conf/logger";
import app from "conf/server";

const PORT = process.env.ROOM_PORT || 7450;

app.listen(PORT, () => {
  logger.info(`Room server listening on port ${PORT}`);
});
