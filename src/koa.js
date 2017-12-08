import _chatbase from '@google/chatbase';

import setInterceptors from './setInterceptors';

export default function chatbaseMiddleware(bot, { apiKey, platform }) {
  const chatbase = _chatbase.setApiKey(apiKey).setPlatform(platform);

  setInterceptors(bot, chatbase);

  return ({ request }, next) => {
    request.body.entry.forEach(entry => {
      let messaging;
      if (entry.messaging) {
        messaging = entry.messaging[0];
      } else if (entry.standby) {
        messaging = entry.standby[0];
      } else {
        return;
      }

      const { id } = messaging.sender;
      let logMessage;

      if (messaging.message && messaging.message.text) {
        logMessage = `Text: ${messaging.message.text}`;
      } else if (messaging.message && messaging.message.quick_reply) {
        logMessage = `Quick Reply Payload: ${
          messaging.message.quick_reply.payload
        }`;
      } else if (messaging.postback) {
        logMessage = `Postback Payload: ${messaging.postback.payload}`;
      } else {
        return;
      }

      chatbase
        .newMessage()
        .setAsTypeUser()
        .setUserId(id)
        .setTimestamp(Date.now().toString())
        .setMessage(logMessage)
        .send()
        .catch(console.error);
    });

    return next();
  };
}
