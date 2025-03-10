import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import IgraService from "../services/IgraService";
import ZanrService from "../services/ZanrService";

export default function IgreDetalji() {
  const { id } = useParams();
  const [gameDetails, setGameDetails] = useState();
  const [hasError, setHasError] = useState(false);

  const handleError = () => setHasError(true);

  async function dohvatiIgru(id) {
    const zanrovi = await ZanrService.getBySifra(id);
    await IgraService.getBySifra(id).then((odgovor) => {
      odgovor.kategorija = zanrovi.imeZanra;
      setGameDetails(odgovor);
    });
  }

  useEffect(() => {
    dohvatiIgru(id);
  }, [id]);

  if (!gameDetails) {
    return <div>Game not found</div>;
  }

  return (
    <Container className="details-container">
      <h1>{gameDetails.naslov}</h1>
      {
        hasError ?
        <img src="https://placehold.co/600x400?text=Još+nema+slike" alt="image" onError={handleError}/> :
        <img src={gameDetails.urlSlike} alt="image" onError={handleError}/>
      }
      <p> Opis: {gameDetails.opis}</p>
      <p>HLTB: {gameDetails.hltb}</p>
      <p>Platforme: {gameDetails.platforme}</p>
      <p>Žanr: {gameDetails.kategorija}</p>
      <p>Datum izdavanja: {gameDetails.datumIzdavanja}</p>
      <h3>Trailer:</h3>
      <iframe
        width="560"
        height="315"
        src={gameDetails.trailer.replace("watch?v=", "embed/")}
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
      ></iframe>
    </Container>
  );
}
