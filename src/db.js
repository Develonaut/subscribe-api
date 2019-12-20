import Firebase from "./lib/Firebase";

export default callback => {
  const db = Firebase.db;
  callback(db);
};
