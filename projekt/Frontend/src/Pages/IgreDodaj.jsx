import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../constants";
import IgraService from "../services/IgraService";

export default function IgreDodaj() {
  const navigate = useNavigate();

  async function dodaj(igra) {
    const odgovor = await IgraService.dodaj(igra);
    if (odgovor.greska) {
      alert("Greška kod dodavanja igre");
      return;
    }
    navigate(RouteNames.PREGLED);
  }

  function odradiSubmit(e) {
    // e je event
    e.preventDefault(); //nemoj odraditi zahtjev na server na standardni način

    let podatci = new FormData(e.target);

    dodaj({
      naslov: podatci.get("naslov"),
      opis: podatci.get("opis"),
      hltb: podatci.get("hltb"),
      platforme: podatci.get("platforme"),
      zanr: podatci.get("kategorija"),
      datumIzdavanja: get("datumIzdavanja"),
      url: get("url"),
      trailer: get("trailer"),
    });
  }

  return (
    <>
      <h2 className="subtitle">Dodavanje nove igre</h2>
      <Form onSubmit={odradiSubmit} style={{ padding: "20px" }}>
        <Form.Group controlId="naslov">
          <Form.Label>Naslov</Form.Label>
          <Form.Control type="text" name="naslov" required />
        </Form.Group>

        <Form.Group controlId="opis">
          <Form.Label>Opis</Form.Label>
          <Form.Control type="text" name="opis" required />
        </Form.Group>

        <Form.Group controlId="hltb">
          <Form.Label>HLTB</Form.Label>
          <Form.Control type="number" name="hltb" required />
        </Form.Group>

        <Form.Group controlId="platforme">
          <Form.Label>Platforme</Form.Label>
          <Form.Control type="text" name="platforme" required />
        </Form.Group>

        <Form.Group controlId="kategorija">
          <Form.Label>Kategorija</Form.Label>
          <Form.Control type="text" name="kategorija" required />
        </Form.Group>

        <Form.Group controlId="url">
          <Form.Label>URL slike</Form.Label>
          <Form.Control type="text" name="url" />
        </Form.Group>

        <Form.Group controlId="trailer">
          <Form.Label>URL trailera</Form.Label>
          <Form.Control type="text" name="trailer" />
        </Form.Group>

        <Form.Group controlId="datumIzdavanja">
          <Form.Label>Datum izdavanja</Form.Label>
          <Form.Control type="date" name="datumIzdavanja" required />
        </Form.Group>
        <Row style={{ marginTop: "20px" }}>
          <Col xs={6} sm={12} md={3} lg={6} xl={6} xxl={6}>
            <Link to={RouteNames.PREGLED} className="btn btn-danger">
              Odustani
            </Link>
          </Col>
          <Col xs={6} sm={12} md={9} lg={6} xl={6} xxl={6}>
            <Button variant="success" type="submit" style={{ float: "right" }}>
              Dodaj igru
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
}
