export default function setInterceptors(bot, chatbase) {
  const { connector: { client: { axios } } } = bot;

  // Add a response interceptor
  axios.interceptors.response.use(response => {
    const { config } = response;

    if (/graph\.facebook\.com.*\/me\/messages/.test(config.url)) {
      const messaging = JSON.parse(config.data);
      const { id } = messaging.recipient;
      let logMessage;

      // TODO: handle more message type?
      if (messaging.message && messaging.message.text) {
        logMessage = `Text: ${messaging.message.text}`;
      } else {
        return response;
      }

      chatbase
        .newMessage()
        .setAsTypeAgent()
        .setUserId(id)
        .setTimestamp(Date.now().toString())
        .setMessage(logMessage)
        .send()
        .catch(e => console.error(e));
    }

    return response;
  });
}
