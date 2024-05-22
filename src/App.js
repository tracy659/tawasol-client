import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./components/Landing";
import { Fragment, useEffect } from "react";
import Navbar from "./components/Navbar";
import store from "./redux/store";
import { Provider } from "react-redux";
import Register from "./components/Users/Register";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import Login from "./components/Users/Login";
import Home from "./components/Home";
import Private from "./components/Private";
import ProfileForm from "./components/ProfileForms/ProfileForm";
import AddEducation from "./components/ProfileForms/AddEducation";
import AddExperience from "./components/ProfileForms/AddExperience";
import { setAuthToken } from "./utils";
import { loadUser } from "./redux/modules/users";
import Developers from "./components/Developers";
import Alert from "./components/Alert";
import Settings from "./components/Settings";
import Posts from "./components/Posts/Posts";
import Post from "./components/Posts/Post";

const options = {
  position: positions.TOP_RIGHT,
  timeout: 5000,
  offset: "30px",
  transitions: transitions.SCALE,
};

function App() {
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <AlertProvider template={AlertTemplate} {...options}>
          <Fragment>
            <Alert />
            <Navbar />
            <Routes>
              <Route exact path="/" element={<Landing />}></Route>
              <Route exact path="/register" element={<Register />}></Route>
              <Route exact path="/login" element={<Login />}></Route>
              <Route
                exact
                path="/create-profile"
                element={<ProfileForm />}
              ></Route>
              <Route
                exact
                path="/add-education"
                element={<Private component={AddEducation} />}
              />
              <Route
                exact
                path="/add-experience"
                element={<Private component={AddExperience} />}
              />
              <Route
                exact
                path="/home"
                element={<Private component={Home} />}
              ></Route>
              <Route
                exact
                path="/developers"
                element={<Private component={Developers} />}
              ></Route>
              <Route
                exact
                path="/settings"
                element={<Private component={Settings} />}
              ></Route>
              <Route
                exact
                path="/edit-profile"
                element={<Private component={ProfileForm} />}
              ></Route>
              <Route
                exact
                path="/posts"
                element={<Private component={Posts} />}
              ></Route>
              <Route
                exact
                path="/posts/:id"
                element={<Private component={Post} />}
              ></Route>
            </Routes>
          </Fragment>
        </AlertProvider>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
