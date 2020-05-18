import React from "react";
import { useHistory } from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import { ApolloConsumer } from "react-apollo";

const Signout = () => {
  const history = useHistory();

  const handleSignout = (client) => {
    localStorage.setItem("token", "");
    client.resetStore();
    history.push("/");
  };

  return (
    <ApolloConsumer>
      {(client) => {
        return (
          <ListItem button onClick={() => handleSignout(client)}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary={"Sign Out"} />
          </ListItem>
        );
      }}
    </ApolloConsumer>
  );
};

export default Signout;
