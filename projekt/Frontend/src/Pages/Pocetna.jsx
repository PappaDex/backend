export default function Pocetna() {
  return (
    <>
      <h1 className="welcome-title">Dobrodošli u Zbirku igara</h1>
      <p className="subtitle">Otkrijte i upravljajte svojim omiljenim igrama</p>
      <span style={{ display: "flex", justifyContent: "center" }}>
        <img
          src="https://assets2.ignimgs.com/2014/06/18/minecraft-buttonjpg-b689ca.jpg"
          alt="game1"
          width={300}
        />
        <img
          src="https://th.bing.com/th/id/OIP.Mvqh5xhx-dWQWDDsV7dVMwHaEK?rs=1&pid=ImgDetMain"
          alt="game2"
          width={400}
        />
        <img
          src="https://cdn.bynogame.com/games/gta5-1662829149472.webp"
          alt="game3"
          width={300}
        />
      </span>
    </>
  );
}
