DELETE FROM
    deb105013n2_beach.beach_team_speler_map;

DELETE FROM
    deb105013n2_beach.beach_poule_team_map;

DELETE FROM
    deb105013n2_beach.beach_wedstrijd;

DELETE FROM
    deb105013n2_beach.beach_poule;

DELETE FROM
    deb105013n2_beach.beach_team;

DELETE FROM
    deb105013n2_beach.beach_speelronde;

INSERT INTO
    deb105013n2_beach.beach_speelronde
SELECT
    *
FROM
    deb105013n2_SKC.beach_speelronde;

INSERT INTO
    deb105013n2_beach.beach_team
SELECT
    *
FROM
    deb105013n2_SKC.beach_team;

INSERT INTO
    deb105013n2_beach.beach_team_speler_map
SELECT
    *
FROM
    deb105013n2_SKC.beach_team_speler_map;

INSERT INTO
    deb105013n2_beach.beach_poule
SELECT
    *
FROM
    deb105013n2_SKC.beach_poule;

INSERT INTO
    deb105013n2_beach.beach_wedstrijd
SELECT
    *
FROM
    deb105013n2_SKC.beach_wedstrijd;

INSERT INTO
    deb105013n2_beach.beach_poule_team_map
SELECT
    *
FROM
    deb105013n2_SKC.beach_poule_team_map;

SELECT
    max(id) + 1 INTO @AutoInc
FROM
    deb105013n2_SKC.beach_team_speler_map;

SET
    @s := CONCAT(
        "ALTER TABLE `deb105013n2_beach`.`beach_team_speler_map` AUTO_INCREMENT=",
        @AutoInc
    );

PREPARE stmt
FROM
    @s;

EXECUTE stmt;

DEALLOCATE PREPARE stmt;

SELECT
    max(id) + 1 INTO @AutoInc
FROM
    deb105013n2_SKC.beach_poule_team_map;

SET
    @s := CONCAT(
        "ALTER TABLE `deb105013n2_beach`.`beach_poule_team_map` AUTO_INCREMENT=",
        @AutoInc
    );

PREPARE stmt
FROM
    @s;

EXECUTE stmt;

DEALLOCATE PREPARE stmt;

SELECT
    max(id) + 1 INTO @AutoInc
FROM
    deb105013n2_SKC.beach_wedstrijd;

SET
    @s := CONCAT(
        "ALTER TABLE `deb105013n2_beach`.`beach_wedstrijd` AUTO_INCREMENT=",
        @AutoInc
    );

PREPARE stmt
FROM
    @s;

EXECUTE stmt;

DEALLOCATE PREPARE stmt;

SELECT
    max(id) + 1 INTO @AutoInc
FROM
    deb105013n2_SKC.beach_poule;

SET
    @s := CONCAT(
        "ALTER TABLE `deb105013n2_beach`.`beach_poule` AUTO_INCREMENT=",
        @AutoInc
    );

PREPARE stmt
FROM
    @s;

EXECUTE stmt;

DEALLOCATE PREPARE stmt;

SELECT
    max(id) + 1 INTO @AutoInc
FROM
    deb105013n2_SKC.beach_team;

SET
    @s := CONCAT(
        "ALTER TABLE `deb105013n2_beach`.`beach_team` AUTO_INCREMENT=",
        @AutoInc
    );

PREPARE stmt
FROM
    @s;

EXECUTE stmt;

DEALLOCATE PREPARE stmt;

SELECT
    max(id) + 1 INTO @AutoInc
FROM
    deb105013n2_SKC.beach_speelronde;

SET
    @s := CONCAT(
        "ALTER TABLE `deb105013n2_beach`.`beach_speelronde` AUTO_INCREMENT=",
        @AutoInc
    );

PREPARE stmt
FROM
    @s;

EXECUTE stmt;

DEALLOCATE PREPARE stmt;