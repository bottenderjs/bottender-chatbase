import _chatbase from '@google/chatbase';

import setInterceptors from './setInterceptors';

export default function chatbaseMiddleware(bot, { apiKey, platform }) {
  const chatbase = _chatbase.setApiKey(apiKey).setPlatform(platform);

  setInterceptors(bot, chatbase);

  return ({ request }, next) => {
    request.body.entry.forEach(entry => {
      // FIXME: messenger postback will fail this
      const { sender: { id }, message: { text } } = entry.messaging[0];

      chatbase
        .newMessage()
        .setAsTypeUser()
        .setUserId(id)
        .setTimestamp(Date.now().toString())
        .setMessage(text)
        .send()
        .catch(console.error);
    });

    return next();
  };
}
