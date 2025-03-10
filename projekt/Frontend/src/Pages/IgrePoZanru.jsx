import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import IgraService from "../services/IgraService";
import ZanrService from "../services/ZanrService";
import { Table, Button } from "react-bootstrap";
export default function IgrePoZanru() {
    const { id } = useParams();
    const [igre, setIgre] = useState([]);
    const [zanr, setZanr] = useState({});
    const navigate = useNavigate();
    useEffect(() => {
        IgraService.getByZanrSifra(id).then((podaci) => setIgre(podaci));
        ZanrService.getBySifra(id).then((podaci) => setZanr(podaci));
    }, [id]);
    return (
        <>
            <h2 className="subtitle">Igre za žanr: {zanr.imeZanra}</h2>
            <Table striped bordered hover responsive className="ruka">
                <thead>
                    <tr>
                        <th>Naziv</th>
                        <th>HLTB</th>
                        <th>Platforme</th>
                        <th>Žanr</th>
                        <th>Datum izdavanja</th>
                        <th style={{ width: "120px", textAlign: "center" }}>Opcije</th>
                    </tr>
                </thead>
                <tbody>
                    {igre.length > 0 ? (
                        igre.map((igra, index) => (
                            <tr key={index}>
                                <td onClick={() => navigate(`/igre/${igra.id}`)}>{igra.naslov}</td>
                                <td onClick={() => navigate(`/igre/${igra.id}`)}>{igra.hltb}</td>
                                <td onClick={() => navigate(`/igre/${igra.id}`)}>{igra.platforme}</td>
                                <td onClick={() => navigate(`/igre/${igra.id}`)}>{zanr.imeZanra}</td>
                                <td onClick={() => navigate(`/igre/${igra.id}`)}>{igra.datumIzdavanja}</td>
                                <td style={{ display: "flex", gap: "10px" }}>
                                    <Button style={{ backgroundColor: "#4CAF50", color: "white" }} onClick={() => navigate(`/igre/update/${igra.id}`)}>
                                        Ažuriraj
                                    </Button>
                                    <Button style={{ backgroundColor: "#f44336", color: "white" }} onClick={() => {
                                        IgraService.obrisi(igra.id).then(() => window.location.reload());
                                    }}>
                                        Obriši
                                    </Button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6">Nema igara</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </>
    );
}
