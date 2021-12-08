import { Switch, Route, Redirect } from "react-router-dom";

import Navbar from "./components/Navbar";
import Sezar from "./pages/Sezar/Sezar";
import Vijner from "./pages/Vijner/Vijner";
import Vernam from "./pages/Vernam/Vernam";
import Affin from "./pages/Affin/Affin";
import A51 from "./pages/A51/A51";
import RC4 from "./pages/RC4/RC4";
import Des from "./pages/Des/Des";

function App() {
  return (
    <>
      <Navbar />
      <main className="mt-4">
        <Switch>
          <Route exact path="/sezar" component={Sezar} />
          <Route exact path="/vijner" component={Vijner} />
          <Route exact path="/vernam" component={Vernam} />
          <Route exact path="/affin" component={Affin} />
          <Route exact path="/a51" component={A51} />
          <Route exact path="/rc4" component={RC4} />
          <Route exact path="/des" component={Des} />
          <Redirect exact from="*" to="/sezar" />
        </Switch>
      </main>
    </>
  );
}

export default App;
