import { useState } from "react";

import { MdEdit } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";

import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import PersonIcon from "@mui/icons-material/Person";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";

function UserItem({
  data: { id, name, lastname, email, phone },
  deleteHandler,
  editHandler,
}) {
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar>
          <PersonIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={name + " " + lastname}
        secondary={email + " | " + phone}
      ></ListItemText>
      <IconButton
        onClick={() => editHandler({ id, name, lastname, email, phone })}
      >
        <EditIcon />
      </IconButton>
      <IconButton onClick={() => deleteHandler(id)}>
        <DeleteForeverIcon />
      </IconButton>
    </ListItem>
  );
}

export default UserItem;
