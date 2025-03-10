import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../constants";
import IgraService from "../services/IgraService";
import { useEffect, useState } from "react";
import ZanrService from "../services/ZanrService";
export default function IgreDodaj() {
    const navigate = useNavigate();
    const [zanrovi, setZanrovi] = useState([]);
    const [odabranePlatforme, setOdabranePlatforme] = useState([]);
    const platformeLista = ["PS5", "PS4", "PC", "XBOX"];
    useEffect(() => {
        ZanrService.get().then((podaci) => setZanrovi(podaci));
    }, []);
    async function dodaj(igra) {
        const odgovor = await IgraService.dodaj(igra);
        if (odgovor.greska) {
            alert("Greška kod dodavanja igre");
            return;
        }
        navigate(RouteNames.PREGLED);
    }
    function odradiSubmit(e) {
        e.preventDefault();
        let podatci = new FormData(e.target);
        const naslov = podatci.get("naslov");
        const opis = podatci.get("opis");
        const hltb = podatci.get("hltb");
        const datumIzdavanja = podatci.get("datumIzdavanja");
        const urlSlike = podatci.get("urlSlike");
        const trailer = podatci.get("trailer");
        const idZanra = podatci.get("idZanra");
        const platforme = odabranePlatforme.join(", ");
        dodaj({
            naslov,
            opis,
            hltb,
            datumIzdavanja,
            urlSlike,
            trailer,
            idZanra: parseInt(idZanra),
            platforme
        });
    }
    function promijeniPlatformu(e) {
        const vrijednost = e.target.value;
        if (e.target.checked) {
            setOdabranePlatforme((prev) => [...prev, vrijednost]);
        } else {
            setOdabranePlatforme((prev) => prev.filter((item) => item !== vrijednost));
        }
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
                <Form.Group controlId="idZanra">
                    <Form.Label>Žanr</Form.Label>
                    <Form.Select name="idZanra" required>
                        <option value="">Odaberite žanr</option>
                        {zanrovi.map((zanr) => (
                            <option key={zanr.id} value={zanr.id}>
                                {zanr.imeZanra}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>
                <Form.Group controlId="platforme" style={{ marginTop: "10px" }}>
                    <Form.Label>Platforme</Form.Label>
                    <div>
                        {platformeLista.map((plat) => (
                            <Form.Check key={plat} inline type="checkbox" label={plat} value={plat} onChange={promijeniPlatformu} />
                        ))}
                    </div>
                </Form.Group>
                <Form.Group controlId="urlSlike">
                    <Form.Label>URL slike</Form.Label>
                    <Form.Control type="text" name="urlSlike" />
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
                    <Col xs={6} sm={12} md={3} lg={6}>
                        <Link to={RouteNames.PREGLED} className="btn btn-danger">
                            Odustani
                        </Link>
                    </Col>
                    <Col xs={6} sm={12} md={9} lg={6}>
                        <Button variant="success" type="submit" style={{ float: "right" }}>
                            Dodaj igru
                        </Button>
                    </Col>
                </Row>
            </Form>
        </>
    );
}
