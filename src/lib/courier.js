import "@babel/polyfill";
import Firebase from "./Firebase";

export async function sendDailyMessages() {
  try {
    console.log(`Start Sending daily message: ${new Date().toISOString()}`);
    console.time("sendDailyMessages");
    const topics = await getDailyMessages();
    sendMessageToTopics(topics);
    console.timeEnd("sendDailyMessages");
  } catch (error) {
    throw new Error(error);
  }
}

export async function sendMessage({ topic, data }) {
  Firebase.send({
    topic,
    data
  });
}

async function getDailyMessages() {
  const topicsRef = await Firebase.db.collection("topics").get();
  return topicsRef.docs.reduce((messages, topicRef) => {
    return {
      ...messages,
      [topicRef.id]: topicRef.data().dailyMessage.data
    };
  }, {});
}

function sendMessageToTopics(topics, i = 0) {
  setTimeout(() => {
    sendMessage({
      topic: Object.keys(topics)[i],
      data: topics[Object.keys(topics)[i]]
    });
    i++; // Increment i.
    if (i < Object.keys(topics).length) sendMessageToTopics(topics, i);
  }, 3000);
}

export default {
  sendMessage,
  sendDailyMessages
};
