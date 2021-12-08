import { Switch, Route } from "react-router";

import Login from "../components/Auth/Login";
import Forgotten from "../components/Auth/ForgotPassword";

function Auth() {
  return (
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/forgotten" component={Forgotten} />
    </Switch>
  );
}

export default Auth;