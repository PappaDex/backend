import { HttpService } from "./HttpService";
async function get() {
    return await HttpService.get("/zanr/DohvatiSveZanrove")
        .then((odgovor) => odgovor.data)
        .catch((e) => { });
}
async function getBySifra(sifra) {
    return await HttpService.get(`/zanr/DohvatiZanr?IdZanra=${sifra}`)
        .then((odgovor) => odgovor.data)
        .catch((e) => { });
}
async function dodaj(zanr) {
    return HttpService.post("/zanr/DodajZanr", zanr)
        .then(() => ({ greska: false, poruka: "Dodano" }))
        .catch(() => ({ greska: true, poruka: "Problem kod dodavanja" }));
}
async function promjeni(zanr) {
    return HttpService.post("/zanr/UpdateZanr", zanr)
        .then(() => ({ greska: false, poruka: "Ažurirano" }))
        .catch(() => ({ greska: true, poruka: "Problem kod ažuriranja" }));
}
async function obrisi(id) {
    return HttpService.delete(`/zanr/ObrisiZanr?id=${id}`)
        .then(() => ({ greska: false, poruka: "Obrisano" }))
        .catch(() => ({ greska: true, poruka: "Problem kod brisanja" }));
}
export default {
    get,
    getBySifra,
    dodaj,
    promjeni,
    obrisi,
};
