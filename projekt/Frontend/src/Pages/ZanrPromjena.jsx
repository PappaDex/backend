import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RouteNames } from "../constants";
import ZanrService from "../services/ZanrService";
import { useEffect, useState } from "react";
export default function ZanrPromjena() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [zanr, setZanr] = useState({});
    useEffect(() => {
        ZanrService.getBySifra(id).then((podaci) => setZanr(podaci));
    }, [id]);
    async function promjeni(zanrObj) {
        zanrObj.id = zanr.id;
        const odgovor = await ZanrService.promjeni(zanrObj);
        if (odgovor.greska) {
            alert("Greška kod ažuriranja žanra");
            return;
        }
        navigate(RouteNames.ZANROVI);
    }
    function odradiSubmit(e) {
        e.preventDefault();
        let podatci = new FormData(e.target);
        const imeZanra = podatci.get("imeZanra");
        promjeni({ imeZanra });
    }
    return (
        <>
            <h2 className="subtitle">Ažuriranje žanra</h2>
            <Form onSubmit={odradiSubmit} style={{ padding: "20px" }}>
                <Form.Group controlId="imeZanra">
                    <Form.Label>Ime žanra</Form.Label>
                    <Form.Control type="text" name="imeZanra" required defaultValue={zanr.imeZanra} />
                </Form.Group>
                <Row style={{ marginTop: "20px" }}>
                    <Col xs={6} sm={12} md={3}>
                        <Link to={RouteNames.ZANROVI} className="btn btn-danger">
                            Odustani
                        </Link>
                    </Col>
                    <Col xs={6} sm={12} md={9}>
                        <Button variant="success" type="submit" style={{ float: "right" }}>
                            Ažuriraj žanr
                        </Button>
                    </Col>
                </Row>
            </Form>
        </>
    );
}
