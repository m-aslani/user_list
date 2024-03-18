import { useState, useEffect } from "react";
import UserItem from "../components/UserItem";
import Edit from "../components/Edit";

import List from "@mui/material/List";
import Alert from "@mui/material/Alert";
import { Grid } from "@mui/material";

function UsersPage() {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [edit, setEdit] = useState(false);
  const [message, setMessage] = useState("");
  const [alert, setAlert] = useState(1);

  useEffect(() => {
    fetch("http://localhost:3000/users")
      .then((res) => res.json())
      .then((json) => setUsers(json));
    console.log(users);
  }, []);

  const deleteHandler = (id) => {
    setMessage("user successfully deleted!");
    fetch(`http://localhost:3000/users/${id}`, {
      method: "DELETE",
    }).then((resp) => {
      if (resp.ok) {
        const newUsersList = users.filter((user) => user.id !== id);
        setUsers(newUsersList);
      }
    });
  };

  const editHandler = (user) => {
    setEdit(!edit);
    setUser(user);
  };

  const changeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setUser((user) => ({ ...user, [name]: value }));
    // console.log(user);
  };

  const addHandler = (id) => {
    if (!user.name || !user.lastname || !user.email || !user.phone) {
      setAlert(2);
    } else {
      setAlert(3);
      fetch(`http://localhost:3000/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      })
        .then((resp) => {
          if (resp.ok) {
            return resp.json();
          } else {
            throw Error("Failed to edit user.");
          }
        })
        .then((user) => {
          setUsers(
            users.map((newuser) => (newuser.id === id ? { ...user } : newuser))
          );
          setUser({
            id: "",
            name: "",
            lastname: "",
            email: "",
            phone: "",
          });
          setEdit(!edit);
        });
    }
  };

  return (
    <div>
      <h1>UsersPage</h1>
      {edit && (
        <Edit
          data={user}
          changeHandler={changeHandler}
          addHandler={addHandler}
        />
      )}

      {alert === 2 && (
        <Grid item xs={12}>
          <Alert severity="error">please fill the inputes!</Alert>
        </Grid>
      )}

      {alert === 3 && (
        <Grid item xs={12}>
          <Alert severity="success">user successfully updated!</Alert>
        </Grid>
      )}

      {message && (
        <Grid item xs={12}>
          <Alert severity="info">{message}</Alert>
        </Grid>
      )}

      {users.length ? (
        <List>
          {users.map((user) => (
            <UserItem
              key={user.id}
              data={user}
              deleteHandler={deleteHandler}
              editHandler={editHandler}
            />
          ))}
        </List>
      ) : (
        <p>NO User Added yet!</p>
      )}
    </div>
  );
}

export default UsersPage;
