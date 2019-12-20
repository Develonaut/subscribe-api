import "@babel/polyfill";
import resource from "resource-router-middleware";
import { sendDailyMessages, sendMessage } from "../lib/courier";
import { MESSAGING_KEY } from "../config/firebaseAdminConfig";

export default ({ config, db }) =>
  resource({
    /** Property name to store preloaded entity on `request`. */
    id: "courier",
    mergeParams: true,
    /** POST / - send to Topic */
    create: (req, res) => {
      if (req.header("authorization") !== `key=${MESSAGING_KEY}`)
        return res.sendStatus(401);
      const {
        body: { topic = undefined, data = undefined } = {},
        params: { action = undefined } = {}
      } = req;
      try {
        const methods = {
          "daily-message": async () => await sendDailyMessages(),
          message: () => {
            if (topic || data) sendMessage({ topic, data });
          }
        };
        methods[action]();
        res.sendStatus(200);
      } catch (error) {
        return res.sendStatus(500);
      }
    }
  });
