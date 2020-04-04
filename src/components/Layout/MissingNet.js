import React, { useState, useEffect } from "react";

import Snackbar from "@material-ui/core/Snackbar";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  snackbar: {
    bottom: "50px",
  },
}));

function MissingNet() {
  const classes = useStyles();
  const [showToast, setShowToast] = useState(false);
  useEffect(() => {
    if (!navigator.onLine) {
      setShowToast(true);
    } else {
      setShowToast(false);
    }
  }, []);
  return (
    <Snackbar
      open={showToast}
      message="You are offline"
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      className={classes.snackbar}
    ></Snackbar>
  );
}

export default MissingNet;
