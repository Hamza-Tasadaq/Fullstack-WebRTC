import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useSelector } from "react-redux";
import { Home, Authenticate, Activate, Rooms, Room } from "./Pages/index.js";
import { Navigation, Loader } from "./Components/Shared";
import useLoadingWithRefresh from "./Hooks/useLoadingWithRefresh";
import "./App.css";

function App() {
  const { loading } = useLoadingWithRefresh();

  return (
    <div className="container">
      <Router>
        <Navigation />
        {loading ? (
          <Loader text="Loading, Please Wait..." />
        ) : (
          <Switch>
            <GuestRoute exact path="/">
              <Home />
            </GuestRoute>
            <GuestRoute path="/authenticate">
              <Authenticate />
            </GuestRoute>
            <SemiProtectedRoute path="/activate">
              <Activate />
            </SemiProtectedRoute>
            <ProtectedRoute path="/rooms">
              <Rooms />
            </ProtectedRoute>
            <ProtectedRoute path="/room/:id">
              <Room />
            </ProtectedRoute>
          </Switch>
        )}
      </Router>
    </div>
  );
}
const GuestRoute = ({ children, ...rest }) => {
  const { isAuth } = useSelector((state) => state.authReducer);

  return (
    <>
      <Route
        {...rest}
        render={({ location }) => {
          return isAuth ? (
            <Redirect
              to={{
                pathname: "/rooms",
                state: { from: location },
              }}
            />
          ) : (
            children
          );
        }}
      ></Route>
    </>
  );
};

const SemiProtectedRoute = ({ children, ...rest }) => {
  const {
    isAuth,
    user: { activated },
  } = useSelector((state) => state.authReducer);

  return (
    <Route
      {...rest}
      render={({ location }) => {
        return !isAuth ? (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location },
            }}
          />
        ) : isAuth && !activated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location },
            }}
          />
        );
      }}
    ></Route>
  );
};

const ProtectedRoute = ({ children, ...rest }) => {
  const {
    isAuth,
    user: { activated },
  } = useSelector((state) => state.authReducer);
  return (
    <Route
      {...rest}
      render={({ location }) => {
        return !isAuth ? (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location },
            }}
          />
        ) : isAuth && !activated ? (
          <Redirect
            to={{
              pathname: "/activate",
              state: { from: location },
            }}
          />
        ) : (
          children
        );
      }}
    ></Route>
  );
};

export default App;
