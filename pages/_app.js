import "../styles/globals.css";
import Head from "next/head";
import Login from "../components/Login";
import "antd/dist/reset.css";
import user from "../reducers/users";
import { useRouter } from "next/router"; // Gérer le changement de page

// REDUCE
import { Provider } from "react-redux";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
//REDUCE PERSIST
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import storage from "redux-persist/lib/storage";

const reducers = combineReducers({ user });
const persistConfig = { key: "CuckNoris", storage };

const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

const persistor = persistStore(store);

function App({ Component, pageProps }) {
  return (
    <>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Head>
            <title>Hackatweet</title>
          </Head>

          <Component {...pageProps} />
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
