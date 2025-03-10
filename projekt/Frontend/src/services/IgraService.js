import { HttpService } from "./HttpService";
async function get() {
    return await HttpService.get("/igre/DohvatiSveIgre")
        .then((odgovor) => odgovor.data)
        .catch((e) => { });
}
async function getBySifra(id) {
    return await HttpService.get(`/igre/DohvatiIgru?idIgre=${id}`)
        .then((odgovor) => odgovor.data)
        .catch((e) => { });
}
async function getByZanrSifra(id) {
    return await HttpService.get(`/igre/DohvatiIgruPoZanru?IdZanra=${parseInt(id)}`)
        .then((odgovor) => odgovor.data)
        .catch((e) => { });
}
async function dodaj(igre) {
    return HttpService.post("/igre/DodajIgru", igre)
        .then(() => ({ greska: false, poruka: "Dodano" }))
        .catch(() => ({ greska: true, poruka: "Problem kod dodavanja" }));
}
async function promjeni(igre) {
    return HttpService.post("/igre/UpdateIgru", igre)
        .then(() => ({ greska: false, poruka: "Ažurirano" }))
        .catch(() => ({ greska: true, poruka: "Problem kod ažuriranja" }));
}
async function obrisi(id) {
    return HttpService.delete(`/igre/obrisiIgru?id=${id}`)
        .then(() => ({ greska: false, poruka: "Obrisano" }))
        .catch(() => ({ greska: true, poruka: "Problem kod brisanja" }));
}
export default {
    get,
    getBySifra,
    getByZanrSifra,
    promjeni,
    dodaj,
    obrisi,
};
