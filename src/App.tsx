import { FC } from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import  { SWRConfig } from 'swr'

import Protected from "./pages/Protected";
import { GlobalProvider } from "./context/Provider";
import Dashboard from "./pages/Dashboard";
import Notes from "./pages/Notes";
import Auth from "./pages/Auth";
import Http from "./utils/Http";
import DetailsPage from "./pages/Details";
import NotFound from "./components/Layout/NotFound";
import Profile from "./components/Dashboard/Profile";

const App: FC<{}> = () => {
  return (
    <GlobalProvider>
      <Router>
        <Switch>
          <SWRConfig 
          value={{
            refreshInterval: 3000,
            fetcher: (url) => Http.get(url).then(res => res.data)
          }}
        >
          <Protected path="/dashboard" component={Dashboard} />
          <Protected path="/notes/:id" component={Notes} />
          <Protected path="/patient/:id/details/:slug" component={DetailsPage} />
          <Protected path="/profile" component={Profile} />
        </SWRConfig>
      <Route component={NotFound} />
      </Switch>
      <Auth />
      </Router>
    </GlobalProvider>
  );
};




export default App;
