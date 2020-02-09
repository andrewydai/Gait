import React from "react";
import { AppBar } from "@material-ui/core";
import "./Header.css";

export default class Header extends React.Component {
  render() {
    return <AppBar position="static" className="Header"></AppBar>;
  }
}
