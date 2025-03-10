CREATE DATABASE ZbirkaIgara
USE ZbirkaIgara;

CREATE TABLE Zanr (
    Id INT PRIMARY KEY IDENTITY(1,1),
    ImeZanra VARCHAR(255) NOT NULL
);

CREATE TABLE Igra (
    Id INT PRIMARY KEY IDENTITY(1,1),
    IdZanra INT,
    Naslov VARCHAR(255) NOT NULL,
    Opis VARCHAR(MAX),
    hltb INT,
    DatumIzdavanja DATE,
    Platforme VARCHAR(255),
    Trailer VARCHAR(MAX),
    UrlSlike VARCHAR(MAX),
    FOREIGN KEY (IdZanra) REFERENCES Zanr(Id)
);

INSERT INTO Zanr (ImeZanra) VALUES 
('Akcijska'),
('Avanturistička'),
('RPG'),
('Strategija'),
('Pucačina'),
('Horor'),
('Sportska'),
('Simulacija'),
('Trkaća'),
('Platformer');

INSERT INTO Igra (IdZanra, Naslov, Opis, hltb, DatumIzdavanja, Platforme, Trailer, UrlSlike) VALUES
(3, 'The Witcher 3: Wild Hunt', 'RPG s otvorenim svijetom koji prati Geralta od Rivije.', 50,'2015-05-19', 'PC, PS4, Xbox One, Switch', 'https://www.youtube.com/watch?v=ehjJ614QfeM', 'https://example.com/witcher3.jpg'),
(3, 'Red Dead Redemption 2', 'Vestern igra s ogromnim otvorenim svijetom.', 60, '2018-10-26', 'PC, PS4, Xbox One', 'https://www.youtube.com/watch?v=gmA6MrX81z4', 'https://example.com/rdr2.jpg'),
(3, 'Dark Souls 3', 'Izazovna RPG igra s teškim borbama.', 40, '2016-04-12', 'PC, PS4, Xbox One', 'https://www.youtube.com/watch?v=-XwhYVzN_a0', 'https://example.com/darksouls3.jpg'),
(4, 'Cyberpunk 2077', 'Futuristička akcijska RPG igra smještena u Night City.', 35, '2020-12-10', 'PC, PS4, PS5, Xbox One, Xbox Series X', 'https://www.youtube.com/watch?v=8X2kIfS6fb8', 'https://example.com/cyberpunk.jpg'),
(1, 'Grand Theft Auto V', 'Popularna open-world akcijska igra.', 40, '2013-09-17', 'PC, PS3, PS4, PS5, Xbox 360, Xbox One, Xbox Series X', 'https://www.youtube.com/watch?v=QkkoHAzjnUs', 'https://example.com/gta5.jpg'),
(6, 'Resident Evil Village', 'Horor igra s preživljavanjem u misterioznom selu.', 10, '2021-05-07', 'PC, PS4, PS5, Xbox One, Xbox Series X', 'https://www.youtube.com/watch?v=btFclZUXpzA', 'https://example.com/revillage.jpg'),
(2, 'The Legend of Zelda: Breath of the Wild', 'Avanturistička igra s velikim otvorenim svijetom.', 50,  '2017-03-03', 'Switch, Wii U', 'https://www.youtube.com/watch?v=1rPxiXXxftE', 'https://example.com/zelda.jpg'),
(8, 'FIFA 23', 'Najnoviji nastavak popularne nogometne simulacije.', 15,'2022-09-30', 'PC, PS4, PS5, Xbox One, Xbox Series X', 'https://www.youtube.com/watch?v=o3V-GvvzjE4', 'https://example.com/fifa23.jpg'),
(9, 'Forza Horizon 5', 'Trkaća igra s ogromnim otvorenim svijetom.', 30,  '2021-11-09', 'PC, Xbox One, Xbox Series X', 'https://www.youtube.com/watch?v=FYH9n37B7Yw', 'https://example.com/forza5.jpg'),
(10, 'Super Mario Odyssey', 'Platformerska igra s Mariom u glavnoj ulozi.', 20, '2017-10-27', 'Switch', 'https://www.youtube.com/watch?v=wGQHQc_3ycE', 'https://example.com/mario.jpg');
