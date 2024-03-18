import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import inputs from "../constants/inputs";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Grid } from "@mui/material";

import Alert from "@mui/material/Alert";

function Users() {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({
    id: "",
    name: "",
    lastname: "",
    email: "",
    phone: "",
  });
  const [alert, setAlert] = useState(false);
  const [message,setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/users")
      .then((res) => res.json())
      .then((json) => setUsers(json));
    console.log(users);
  }, []);

  const changeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setUser((user) => ({ ...user, [name]: value }));
  };

  const addHandler = () => {
    if (!user.name || !user.lastname || !user.email || !user.phone) {
      setAlert(true);
    } else {
        setAlert(false);
        setMessage("new user successfully added!");
      const newid = parseInt(users[users.length - 1].id) + 1;
      const newUser = { ...user, id: newid + "" };
      fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      })
        .then((resp) => {
          if (resp.ok) {
            return resp.json();
          } else {
            throw Error("Failed to add new user.");
          }
        })
        .then((newuser) => {
          setUsers((users) => [...users, newuser]);
          setUser({
            id: "",
            name: "",
            lastname: "",
            email: "",
            phone: "",
          });
        });
    }
  };

  return (
    <Grid container spacing={2}>
      {inputs.map((input, index) => (
        <Grid item xs={6} md={3} key={index}>
          <TextField
            key={index}
            name={input.name}
            label={input.name}
            type={input.type}
            placeholder={input.placeholder}
            value={user[input.name]}
            onChange={changeHandler}
          />
        </Grid>
      ))}
      {alert && <Grid item xs={12}>
      <Alert severity="error">please fill the inputes!</Alert>
        </Grid>
      }
      {message && <Grid item xs={12}>
      <Alert severity="success">{message}</Alert>
        </Grid>
      }
      <Grid item xs={12}>
        <Button
          variant="outlined"
          color="success"
          onClick={addHandler}
          fullWidth
        >
          Add User
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Button variant="outlined" fullWidth>
          <Link to="/users">User List</Link>
        </Button>
      </Grid>
    </Grid>
  );
}

export default Users;
