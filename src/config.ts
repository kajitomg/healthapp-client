
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
    baseUrl: 'http://45.146.165.191:5000'
  },
  redux: {
  
  }
}

export default config;
