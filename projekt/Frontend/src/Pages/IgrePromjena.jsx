import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RouteNames } from "../constants";
import IgraService from "../services/IgraService";
import { useEffect, useState } from "react";
import ZanrService from "../services/ZanrService";

export default function IgrePromjena() {
  const navigate = useNavigate();
  const [igra, setIgra] = useState({});
  const [zanrovi, setZanrovi] = useState([]);
  const { id } = useParams();

  function dohvatiIgru(id) {
    debugger;
    
    IgraService.getBySifra(id).then((odgovor) => {
        debugger;
      ZanrService.get(id).then((zanrovi) => {
        setZanrovi(zanrovi);
        odgovor.kategorija = zanrovi.filter((z) => z.id === odgovor.idZanra)[0].imeZanra;
      });
      setIgra(odgovor);
    });
  }

  useEffect(() => {
    dohvatiIgru(id);
  }, [id]);

    async function promjeni(id, igra) {
      igra.id=id
    const odgovor = await IgraService.promjeni(igra);
    if (odgovor.greska) {
      alert("Greška kod izmjene igre");
      return;
    }
    navigate(RouteNames.PREGLED);
  }

  function odradiSubmit(e) {
    // e je event
    e.preventDefault(); //nemoj odraditi zahtjev na server na standardni način

    let podatci = new FormData(e.target);
    promjeni({
      naslov: podatci.get("naslov"),
      opis: podatci.get("opis"),
      hltb: podatci.get("hltb"),
      platforme: podatci.get("platforme"),
      idZanra: zanrovi.filter((z) => z.imeZanra === podatci.get("kategorija"))[0].id,
      datumIzdavanja: podatci.get("datumIzdavanja"),
      urlSlike: podatci.get("url"),
      trailer: podatci.get("trailer"),
    });
  }

  return (
    <>
      <h2 className="subtitle">Ažuriranje igre</h2>
      <Form onSubmit={odradiSubmit} style={{ padding: "20px" }}>
        <Form.Group controlId="naslov">
          <Form.Label>Naslov</Form.Label>
          <Form.Control
            type="text"
            name="naslov"
            required
            defaultValue={igra.naslov}
          />
        </Form.Group>

        <Form.Group controlId="opis">
          <Form.Label>Opis</Form.Label>
          <Form.Control
            type="text"
            name="opis"
            required
            defaultValue={igra.opis}
          />
        </Form.Group>

        <Form.Group controlId="hltb">
          <Form.Label>HLTB</Form.Label>
          <Form.Control
            type="number"
            name="hltb"
            required
            defaultValue={igra.hltb}
          />
        </Form.Group>

        <Form.Group controlId="platforme">
          <Form.Label>Platforme</Form.Label>
          <Form.Control
            type="text"
            name="platforme"
            required
            defaultValue={igra.platforme}
          />
        </Form.Group>

        <Form.Group controlId="kategorija">
          <Form.Label>Kategorija</Form.Label>
          <Form.Control
            type="text"
            name="kategorija"
            required
            defaultValue={igra.kategorija}
          />
        </Form.Group>

        <Form.Group controlId="url">
          <Form.Label>URL slike</Form.Label>
          <Form.Control type="text" name="url" defaultValue={igra.urlSlike} />
        </Form.Group>

        <Form.Group controlId="trailer">
          <Form.Label>URL trailera</Form.Label>
          <Form.Control
            type="text"
            name="trailer"
            defaultValue={igra.trailer}
          />
        </Form.Group>

        <Form.Group controlId="datumIzdavanja">
          <Form.Label>Datum izdavanja</Form.Label>
          <Form.Control
            type="date"
            name="datumIzdavanja"
            required
            defaultValue={igra.datumIzdavanja}
          />
        </Form.Group>
        <Row style={{ marginTop: "20px" }}>
          <Col xs={6} sm={12} md={3} lg={6} xl={6} xxl={6}>
            <Link to={RouteNames.PREGLED} className="btn btn-danger">
              Odustani
            </Link>
          </Col>
          <Col xs={6} sm={12} md={9} lg={6} xl={6} xxl={6}>
            <Button variant="success" type="submit" style={{ float: "right" }}>
              Ažuriraj igru
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
}
