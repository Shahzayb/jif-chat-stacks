import React from 'react';
import {TextField as MuiTextField} from '@material-ui/core';

function TextField({value, onChange}) {
  return (
    <MuiTextField
      multiline
      inputProps={{maxLength: 140}}
      rowsMax={5}
      value={value}
      onChange={onChange}
      variant="outlined"
      fullWidth
      placeholder="Say hi"
    />
  );
}

export default TextField;
