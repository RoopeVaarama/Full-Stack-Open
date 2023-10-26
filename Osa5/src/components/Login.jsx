import loginService from "../services/login";
import blogService from "../services/blogs";
import { useState } from "react";
import Notification from "./Notification";

const Login = ({ message, setMessage, setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();
    console.log("logging in with", username, password);
    loginService
      .login({ username, password })
      .then((user) => {
        console.log("user", user);
        setUser(user);
        setUsername("");
        setPassword("");
        blogService.setToken(user.token);
        localStorage.setItem("user", JSON.stringify(user));
        setMessage(`Welcome ${user.name}`);
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      })
      .catch((error) => {
        setMessage("Error: Wrong username or password");
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      });
  };

  return (
    <>
      <h2>Login</h2>
      <Notification message={message} />
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </>
  );
};
export default Login;
