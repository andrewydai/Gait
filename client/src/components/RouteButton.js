import React from "react";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const RouteButton = ({ path, label }) => {
  let history = useHistory();

  function handleClick() {
    history.push(`/${path}`);
  }

  return (
    <Button type="button" onClick={handleClick} variant="outlined">
      {label}
    </Button>
  );
};

export default RouteButton;
