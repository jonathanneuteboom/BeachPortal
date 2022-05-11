CREATE TABLE beach_speellocatie (
  id INT AUTO_INCREMENT PRIMARY KEY,
  naam VARCHAR(100)
);

INSERT INTO
  beach_speellocatie(naam)
VALUES
  ('USC'),
  ('Leython 1'),
  ('Leython 2');

ALTER TABLE
  beach_poule
ADD
  COLUMN speellocatie_id int NOT NULL;

UPDATE
  beach_poule
SET
  speellocatie_id = (
    SELECT
      id
    FROM
      beach_speellocatie
    WHERE
      naam = 'USC'
  );

ALTER TABLE
  beach_poule
ADD
  CONSTRAINT beach_poule_speellocatie FOREIGN KEY (speellocatie_id) REFERENCES beach_speellocatie(id);

ALTER TABLE
  beach_poule DROP CONSTRAINT speelronde_id_2;

ALTER TABLE
  beach_poule
ADD
  CONSTRAINT speelronde_tijd_locatie UNIQUE (speelronde_id, speeltijd, speellocatie_id);