import { Switch, Route, Redirect } from "react-router-dom";

import Navbar from "./components/Navbar";
import Sezar from "./pages/Sezar/Sezar";
import Vijner from "./pages/Vijner/Vijner";
import Vernam from "./pages/Vernam/Vernam";

function App() {
  return (
    <>
      <Navbar />
      <main className='mt-4' >
        <Switch>
          <Route exact path="/sezar" component={Sezar} />
          <Route exact path="/vijner" component={Vijner} />
          <Route exact path="/vernam" component={Vernam} />
          <Redirect exact from="*" to="/sezar" />
        </Switch>
      </main>
    </>
  );
}

export default App;
