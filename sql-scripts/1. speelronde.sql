DROP TABLE if exists beach_wedstrijd;

DROP TABLE if exists beach_team_speler_map;

DROP TABLE if exists beach_team;

DROP TABLE if exists beach_poule;

DROP TABLE if exists beach_speelronde;

drop table if exists beach_poule_team_map;

CREATE TABLE beach_speelronde (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nummer INT NOT NULL,
    UNIQUE KEY(nummer)
);

CREATE TABLE beach_poule (
    id INT AUTO_INCREMENT PRIMARY KEY,
    speelronde_id INT NOT NULL,
    categorie INT NOT NULL,
    naam CHAR NOT NULL,
    speeltijd DATETIME NOT NULL,
    FOREIGN KEY (speelronde_id) REFERENCES beach_speelronde(id),
    UNIQUE KEY(speelronde_id, categorie, naam),
    UNIQUE KEY(speelronde_id, speeltijd)
);

CREATE TABLE beach_team (
    id INT AUTO_INCREMENT PRIMARY KEY,
    categorie INT NOT NULL,
    naam VARCHAR(128) NOT NULL,
    UNIQUE KEY(categorie, naam)
);

CREATE TABLE beach_team_speler_map (
    id INT AUTO_INCREMENT PRIMARY KEY,
    team_id INT NOT NULL,
    speler_id INT NOT NULL,
    FOREIGN KEY (team_id) REFERENCES beach_team(id),
    FOREIGN KEY (speler_id) REFERENCES j3_users(id),
    UNIQUE KEY(team_id, speler_id)
);

CREATE TABLE beach_wedstrijd (
    id INT AUTO_INCREMENT PRIMARY KEY,
    poule_id INT NOT NULL,
    team1_id INT NOT NULL,
    team2_id INT NOT NULL,
    punten_team1 INT,
    punten_team2 INT,
    FOREIGN KEY (poule_id) REFERENCES beach_poule(id),
    FOREIGN KEY (team1_id) REFERENCES beach_team(id),
    FOREIGN KEY (team2_id) REFERENCES beach_team(id),
    UNIQUE KEY(poule_id, team1_id, team2_id)
);

CREATE TABLE beach_poule_team_map (
    id INT AUTO_INCREMENT PRIMARY KEY,
    poule_id INT NOT NULL,
    team_id INT NOT NULL,
    FOREIGN KEY (poule_id) REFERENCES beach_poule(id),
    FOREIGN KEY (team_id) REFERENCES beach_team(id),
    UNIQUE KEY(poule_id, team_id)
);