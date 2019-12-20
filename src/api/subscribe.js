import "@babel/polyfill";
import resource from "resource-router-middleware";
import Firebase from "../lib/Firebase";

export default ({ config, db }) =>
  resource({
    /** Property name to store preloaded entity on `request`. */
    id: "subscribe",

    /** For requests with an `id`, you can auto-load the entity.
     *  Errors terminate the request, success sets `req[id] = data`.
     */
    load(req, id, callback) {
      let subscription = [].find(subscription => subscription.id === id);
      let err = subscription ? null : "Not found";
      callback(err, subscription);
    },

    /** GET / - List all entities */
    index({ params }, res) {
      res.json(subscriptions);
    },

    /** POST / - Subscribe to Topic */
    async create({ body }, res) {
      const response = await Firebase.subscribeToTopic(body);
      res.json(response);
    },

    /** GET /:id - Return a given entity */
    read({ subscription }, res) {
      res.json(subscription);
    },

    /** PUT /:id - Update a given entity */
    update({ subscription, body }, res) {
      for (let key in body) {
        if (key !== "id") {
          subscription[key] = body[key];
        }
      }
      res.sendStatus(204);
    },

    /** DELETE /:id - Delete a given entity */
    delete({ subscription }, res) {
      subscriptions.splice(subscriptions.indexOf(subscription), 1);
      res.sendStatus(204);
    }
  });
