import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../constants";
import ZanrService from "../services/ZanrService";
export default function ZanrDodaj() {
    const navigate = useNavigate();
    async function dodaj(zanr) {
        const odgovor = await ZanrService.dodaj(zanr);
        if (odgovor.greska) {
            alert("Greška kod dodavanja žanra");
            return;
        }
        navigate(RouteNames.ZANROVI);
    }
    function odradiSubmit(e) {
        e.preventDefault();
        let podatci = new FormData(e.target);
        const imeZanra = podatci.get("imeZanra");
        dodaj({ imeZanra });
    }
    return (
        <>
            <h2 className="subtitle">Dodavanje novog žanra</h2>
            <Form onSubmit={odradiSubmit} style={{ padding: "20px" }}>
                <Form.Group controlId="imeZanra">
                    <Form.Label>Ime žanra</Form.Label>
                    <Form.Control type="text" name="imeZanra" required />
                </Form.Group>
                <Row style={{ marginTop: "20px" }}>
                    <Col xs={6} sm={12} md={3}>
                        <Link to={RouteNames.ZANROVI} className="btn btn-danger">
                            Odustani
                        </Link>
                    </Col>
                    <Col xs={6} sm={12} md={9}>
                        <Button variant="success" type="submit" style={{ float: "right" }}>
                            Dodaj žanr
                        </Button>
                    </Col>
                </Row>
            </Form>
        </>
    );
}
