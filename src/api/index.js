import { version } from "../../package.json";
import { Router } from "express";
import subscribe from "./subscribe";
import courier from "./courier";

export default ({ config, db }) => {
  let api = Router();
  // Mount route resources.
  api.use("/subscribe", subscribe({ config, db }));
  api.use("/courier/:action", courier({ config, db }));
  // perhaps expose some API metadata at the root
  api.get("/", (req, res) => {
    res.json({ version });
  });

  return api;
};
