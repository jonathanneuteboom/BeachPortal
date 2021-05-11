CREATE TABLE beach_speelronde (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nummer INT NOT NULL
);

CREATE TABLE beach_poule (
    id INT AUTO_INCREMENT PRIMARY KEY,
    speelronde_id INT NOT NULL,
    categorie INT NOT NULL,
    naam CHAR NOT NULL,
    speeltijd DATETIME NOT NULL,
    FOREIGN KEY (speelronde_id) REFERENCES beach_speelronde(id)
);

CREATE TABLE beach_team (
    id INT AUTO_INCREMENT PRIMARY KEY,
    categorie INT NOT NULL,
    naam VARCHAR(128) NOT NULL
);

CREATE TABLE beach_team_speler_map (
    id INT AUTO_INCREMENT PRIMARY KEY,
    team_id INT NOT NULL,
    speler_id INT NOT NULL,
    FOREIGN KEY (team_id) REFERENCES beach_team(id),
    FOREIGN KEY (speler_id) REFERENCES j3_users(id)
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
    FOREIGN KEY (team2_id) REFERENCES beach_team(id)
);