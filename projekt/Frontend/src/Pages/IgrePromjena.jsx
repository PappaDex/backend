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
    const [odabranePlatforme, setOdabranePlatforme] = useState([]);
    const platformeLista = ["PS5", "PS4", "PC", "XBOX"];
    const { id } = useParams();
    useEffect(() => {
        IgraService.getBySifra(id).then((odgovor) => {
            setIgra(odgovor);
            if (odgovor.platforme) {
                setOdabranePlatforme(odgovor.platforme.split(",").map((p) => p.trim()));
            }
        });
        ZanrService.get().then((podaci) => setZanrovi(podaci));
    }, [id]);
    async function promjeni(igraObj) {
        igraObj.id = igra.id;
        const odgovor = await IgraService.promjeni(igraObj);
        if (odgovor.greska) {
            alert("Greška kod izmjene igre");
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
        promjeni({
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
            <h2 className="subtitle">Ažuriranje igre</h2>
            <Form onSubmit={odradiSubmit} style={{ padding: "20px" }}>
                <Form.Group controlId="naslov">
                    <Form.Label>Naslov</Form.Label>
                    <Form.Control type="text" name="naslov" required defaultValue={igra.naslov} />
                </Form.Group>
                <Form.Group controlId="opis">
                    <Form.Label>Opis</Form.Label>
                    <Form.Control type="text" name="opis" required defaultValue={igra.opis} />
                </Form.Group>
                <Form.Group controlId="hltb">
                    <Form.Label>HLTB</Form.Label>
                    <Form.Control type="number" name="hltb" required defaultValue={igra.hltb} />
                </Form.Group>
                <Form.Group controlId="idZanra">
                    <Form.Label>Žanr</Form.Label>
                    <Form.Select name="idZanra" required defaultValue={igra.idZanra}>
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
                            <Form.Check key={plat} inline type="checkbox" label={plat} value={plat} onChange={promijeniPlatformu} checked={odabranePlatforme.includes(plat)} />
                        ))}
                    </div>
                </Form.Group>
                <Form.Group controlId="urlSlike">
                    <Form.Label>URL slike</Form.Label>
                    <Form.Control type="text" name="urlSlike" defaultValue={igra.urlSlike} />
                </Form.Group>
                <Form.Group controlId="trailer">
                    <Form.Label>URL trailera</Form.Label>
                    <Form.Control type="text" name="trailer" defaultValue={igra.trailer} />
                </Form.Group>
                <Form.Group controlId="datumIzdavanja">
                    <Form.Label>Datum izdavanja</Form.Label>
                    <Form.Control type="date" name="datumIzdavanja" required defaultValue={igra.datumIzdavanja} />
                </Form.Group>
                <Row style={{ marginTop: "20px" }}>
                    <Col xs={6} sm={12} md={3} lg={6}>
                        <Link to={RouteNames.PREGLED} className="btn btn-danger">
                            Odustani
                        </Link>
                    </Col>
                    <Col xs={6} sm={12} md={9} lg={6}>
                        <Button variant="success" type="submit" style={{ float: "right" }}>
                            Ažuriraj igru
                        </Button>
                    </Col>
                </Row>
            </Form>
        </>
    );
}
