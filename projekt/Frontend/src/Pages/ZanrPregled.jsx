import { useEffect, useState } from "react";
import ZanrService from "../services/ZanrService";
import { useNavigate } from "react-router-dom";
import { ListGroup, Button, Row, Col } from "react-bootstrap";
import { RouteNames } from "../constants";
export default function ZanrPregled() {
    const [zanrovi, setZanrovi] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        ZanrService.get().then((podaci) => setZanrovi(podaci));
    }, []);
    function obrisiZanr(id) {
        ZanrService.obrisi(id).then((odgovor) => {
            if (odgovor.greska) {
                alert(odgovor.poruka);
            } else {
                setZanrovi(zanrovi.filter((z) => z.id !== id));
            }
        });
    }
    return (
        <>
            <h2 className="subtitle">Pregled žanrova</h2>
            <Button variant="success" onClick={() => navigate(RouteNames.ZANR_DODAJ)} style={{ marginBottom: "20px" }}>
                Dodaj žanr
            </Button>
            <ListGroup>
                {zanrovi.map((zanr) => (
                    <ListGroup.Item key={zanr.id}>
                        <Row>
                            <Col xs={6} onClick={() => navigate(RouteNames.ZANR_IGRE.replace(":id", zanr.id))}>
                                {zanr.imeZanra}
                            </Col>
                            <Col xs={3}>
                                <Button variant="warning" onClick={() => navigate(`/zanrovi/update/${zanr.id}`)}>

                                    Ažuriraj
                                </Button>
                            </Col>
                            <Col xs={3}>
                                <Button variant="danger" onClick={() => obrisiZanr(zanr.id)}>
                                    Obriši
                                </Button>
                            </Col>
                        </Row>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </>
    );
}
