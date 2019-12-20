import "@babel/polyfill";
import { adminCert, databaseURL } from "../config/firebaseAdminConfig";
import * as admin from "firebase-admin";

export default new class Firebase {
  constructor() {
    admin.initializeApp({
      credential: admin.credential.cert(adminCert),
      databaseURL: databaseURL
    });
    this.messaging = admin.messaging();
    this.db = admin.firestore();
  }

  async subscribeToTopic({ tokens = [], topics = [] }) {
    if (!tokens.length || !topics.length)
      throw new Error("Missing required properties");
    try {
      const promises = topics.map(topic =>
        this.messaging.subscribeToTopic(tokens, topic)
      );
      Promise.all(promises);
      return "success";
    } catch (error) {
      throw new Error(error);
    }
  }

  async send(message) {
    try {
      console.time("message");
      const response = await this.messaging.send(message);
      console.log("Successfully sent message:", response);
      console.timeEnd("message");
    } catch (error) {
      console.log("Error sending message:", error);
    }
  }
}();
