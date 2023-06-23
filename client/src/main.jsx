import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from "react-redux";
import { Store,persistor } from "./Redux/Store";
import './index.css'
import App from './App'

import {PersistGate} from 'redux-persist/integration/react';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <Provider store={Store}>
        <PersistGate loading={null}  persistor={persistor}>
        <App />
        </PersistGate>
    </Provider>
  </React.StrictMode>,
)
