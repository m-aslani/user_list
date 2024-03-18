import inputs from "../constants/inputs";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Grid } from "@mui/material";

function Edit({ data, changeHandler, addHandler }) {
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
            value={data[input.name]}
            onChange={changeHandler}
            required
          />
        </Grid>
      ))}
      <Grid item xs={12}>
        <Button
          variant="outlined"
          color="success"
          onClick={() => addHandler(data.id)}
          fullWidth
        >
          Update
        </Button>
      </Grid>
    </Grid>
  );
}

export default Edit;
