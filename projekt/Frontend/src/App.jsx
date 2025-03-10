import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Container } from "react-bootstrap";
import NavbarEdunova from "./Components/NavbarEdunova";
import { Route, Routes } from "react-router-dom";
import { RouteNames } from "./constants";
import Pocetna from "./Pages/Pocetna";
import IgreDodaj from "./Pages/IgreDodaj";
import IgreDetalji from "./Pages/IgreDetalji";
import IgrePromjena from "./Pages/IgrePromjena";
import IgrePregled from "./Pages/IgrePregled";
import ONama from "./Pages/ONama";
import ZanrPregled from "./Pages/ZanrPregled"
function App() {
  return (
    <>
      <Container>
        <NavbarEdunova />
        <Routes>
          <Route path={RouteNames.HOME} element={<Pocetna />} />
          <Route path={RouteNames.PREGLED} element={<IgrePregled />} />
          <Route path={RouteNames.DODAJ} element={<IgreDodaj />} />
          <Route path={RouteNames.PROMJENA} element={<IgrePromjena />} />
          <Route path={RouteNames.DETALJI} element={<IgreDetalji />} />
          <Route path={RouteNames.ZANROVI} element={<ZanrPregled />} />
          <Route path="/o-stranici" element={<ONama />} />
          <Route
            path="*"
            element={<h1 className="subtitle">404 - Not Found</h1>}
          />
        </Routes>
      </Container>
      <div
        style={{
          textAlign: "center",
          paddingRight: "30px",
          position: "fixed",
          bottom: 0,
          width: "100%",
        }}
      >
        &copy; Zbirka igara {new Date().getFullYear()}.
      </div>
    </>
  );
}

export default App;
