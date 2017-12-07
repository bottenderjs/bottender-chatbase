export default function setInterceptors(bot, chatbase) {
  const { connector: { client: { axios } } } = bot;

  // Add a response interceptor
  axios.interceptors.response.use(response => {
    const { config } = response;

    if (/graph\.facebook\.com.*\/me\/messages/.test(config.url)) {
      const { recipient: { id }, message: { text } } = JSON.parse(config.data);

      chatbase
        .newMessage()
        .setAsTypeAgent()
        .setUserId(id)
        .setTimestamp(Date.now().toString())
        .setMessage(text)
        .send()
        .catch(e => console.error(e));
    }

    return response;
  });
}
