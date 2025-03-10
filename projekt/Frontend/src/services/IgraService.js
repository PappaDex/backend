import { HttpService } from "./HttpService";

async function get() {
  return await HttpService.get("/igre/DohvatiSveIgre")
    .then((odgovor) => {
      return odgovor.data;
    })
    .catch((e) => {});
}

async function getBySifra(id) {
  return await HttpService.get(`/igre/DohvatiIgru?idIgre=${id}`)
    .then((odgovor) => {
      return odgovor.data;
    })
    .catch((e) => {});
}
async function getByZanrSifra(id) {
    return await HttpService.get(`/igre/DohvatiIgruPoZanru?idZandra=${id}`)
        .then((odgovor) => {
            return odgovor.data;
        })
        .catch((e) => { });
}
async function dodaj(igre) {
  return HttpService.post("/igre/DodajIgru", igre)
    .then(() => {
      return { greska: false, poruka: "Dodano" };
    })
    .catch(() => {
      return { greska: true, poruka: "Problem kod dodavanja" };
    });
}

async function promjeni(igre) {
    return HttpService.post("/igre/UpdateIgru", igre)
    .then(() => {
      return { greska: false, poruka: "Dodano" };
    })
    .catch(() => {
      return { greska: true, poruka: "Problem kod dodavanja" };
    });
}

async function obrisi(id) {
  return HttpService.delete(`/igre/obrisiIgru?id=${id}`)
    .then(() => {
      return { greska: false, poruka: "Obrisano" };
    })
    .catch(() => {
      return {
        greska: true,
        poruka: "Problem kod brisanja",
      };
    });
}

export default {
  get,
  getBySifra,
  getByZanrSifra,
  promjeni,
  dodaj,
  obrisi,
};
