import { useEffect, useState } from "react";
import IgraService from "../services/IgraService";
import { Button, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../constants";
import ZanrService from "../services/ZanrService";

export default function ZanrPregled() {
    const [zanrovi, setZanrovi] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    async function dohvatiZanrove() {
        const zanrovi = await ZanrService.get();
        const odgovor = await IgraService.get();
        odgovor.forEach((igra) => {
            igra.kategorija = (zanrovi.length == 0 ? [] : zanrovi.find((z) => z.id === igra.idZanra).imeZanra);
        }
        );
        setIgre(odgovor);
    }

    function obrisiIgru(id) {
        const odgovor = IgraService.obrisi(id);
        if (odgovor.greska) {
            alert("Greška kod brisanja igre");
            setIsLoading(false);
            return;
        }
        setIsLoading(false);
        window.location.reload();
    }

    //hooks (kuka) se izvodi prilikom dolaska na stranicu igre
    useEffect(() => {
        dohvatiZanrove();
    }, []);

    return (
        <>
            <Link
                to={RouteNames.DODAJ}
                className="btn btn-success"
                style={{ marginTop: "20px", marginBottom: "20px", width: "100%" }}
            >
                Dodaj novi zanr
            </Link>
            <Table striped bordered hover responsive className="ruka">
                <thead>
                    <tr>
                        <th>Naziv</th>
                        <th style={{ width: "120px", textAlign: "center" }}>Opcije</th>
                    </tr>
                </thead>
                <tbody>
                    {zanrovi &&
                        zanrovi.map((zanr, index) => (
                            <tr key={index}>
                                <td onClick={() => navigate(`/zanr/${zanr.id}`)}>
                                    {zanr.naslov}
                                </td>
                                <td style={{ display: "flex", gap: "10px" }}>
                                    <Button
                                        style={{ backgroundColor: "#4CAF50", color: "white" }}
                                        onClick={() => navigate(`/zanr/update/${zanr.id}`)}
                                    >
                                        Ažuriranje
                                    </Button>

                                    <Button
                                        style={{ backgroundColor: "#f44336", color: "white" }}
                                        onClick={() => {
                                            setIsLoading(true);
                                            obrisiIgru(zanr.id);
                                        }}
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            <span
                                                className="spinner-border spinner-border-sm"
                                                role="status"
                                                aria-hidden="true"
                                            ></span>
                                        ) : (
                                            "Brisanje"
                                        )}
                                    </Button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </Table>
        </>
    );
}
