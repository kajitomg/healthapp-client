import ReactDOM from 'react-dom/client'
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import {ServicesContext} from "./context.ts";
import services from "./shared/services";
import {App} from "./app";



ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={services.redux}>
    <ServicesContext.Provider value={services}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ServicesContext.Provider>
  </Provider>
)
