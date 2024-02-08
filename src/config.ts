
const config = {
  store: {
    modules: {
      session: {
        tokenHeader: 'X-Token',
        languageHeader: 'Accept-Language'
      }
    }
  },
  api: {
    baseUrl: 'http://localhost:5000'
  },
  redux: {
  
  }
}

export default config;
