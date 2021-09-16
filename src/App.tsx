import React from "react";
import Home from "./Components/Home";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import Login from "./Components/login";
import store from "./redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import { persistStore } from "redux-persist";
import ViewDoc from "./Components/ViewDoc";
import Signup from "./Components/signup";
const persistor = persistStore(store);

function App() {
  return (
    <>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <BrowserRouter>
            <Switch>
              <Route path="/" component={Login} exact />

              <Route path="/home" component={Home} exact />
              <Route path="/signup" component={Signup} exact />

              <Route path="/viewdoc" component={ViewDoc} exact />
            </Switch>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
