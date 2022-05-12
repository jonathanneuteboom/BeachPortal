import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { Categorie } from '../models/Categorie';
import { DeleteTeamDialogComponent } from '../dialogs/delete-team-dialog/delete-team-dialog.component';
import { EditTeamDialogComponent } from '../dialogs/edit-team-dialog/edit-team-dialog.component';
import { MatSelectChange } from '@angular/material/select';
import { MatTableDataSource } from '@angular/material/table';
import { Poule } from '../models/Poule';
import { PouleService } from '../services/poule.service';
import { Speelronde } from '../models/Speelronde';
import { SpeelrondeService } from '../services/speelronde.service';
import { Team } from '../models/Team';
import { TeamService } from '../services/team.service';
import { Speellocatie } from '../models/Speellocatie';
import { OverlapItem } from '../models/OverlapItem';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss']
})
export class ManagementComponent implements OnInit {
  categorien = Object.values(Categorie);
  columns: string[] = ['naam', 'spelers', 'categorie', 'actions'];
  groupedTeams: Team[][] = [[], [], []];
  teams = new MatTableDataSource();
  speelronde: Speelronde;
  speellocaties: Speellocatie[];
  overlappingItems: OverlapItem[] = [];

  constructor(
    private teamService: TeamService,
    private dialog: MatDialog,
    private speelrondeService: SpeelrondeService,
    private pouleService: PouleService
  ) {}

  ngOnInit(): void {
    this.getAllTeams();
    this.getCurrentSpeelronde();
    this.getSpeellocaties();
    this.getOverlappingPlayers();
  }

  onPouleChanged() :void {
    this.getCurrentSpeelronde()
    this.getOverlappingPlayers()
  }

  getAllTeams(): void {
    this.teamService.getAll().subscribe((teams) => {
      teams = teams || [];
      teams.forEach(
        (team) => (team.categorieValue = Categorie[team.categorie])
      );
      this.teams.data = teams;
      this.groupedTeams = Array(3);
      this.groupedTeams[Categorie.Heren] = teams.filter(
        (team) => team.categorie === Categorie.Heren
      );
      this.groupedTeams[Categorie.Dames] = teams.filter(
        (team) => team.categorie === Categorie.Dames
      );
      this.groupedTeams[Categorie.Mix] = teams.filter(
        (team) => team.categorie === Categorie.Mix
      );
    });
  }

  getOverlappingItemString(item: OverlapItem):string {
    const datepipe = new DatePipe('en-US')
    const tijdstip1 = datepipe.transform(new Date(item.poule1.speeltijd), 'HH:mm')
    const tijdstip2 = datepipe.transform(new Date(item.poule2.speeltijd), 'HH:mm')

    const poule1 = `${item.poule1.categorie} ${item.poule1.naam} (${tijdstip1}, ${item.poule1.speellocatie.naam})`
    const poule2 = `${item.poule2.categorie} ${item.poule2.naam} (${tijdstip2}, ${item.poule2.speellocatie.naam})`
    return `${poule1} & ${poule2}: ${item.spelers.map(speler => speler.naam).join(', ')}`
  }

  getCurrentSpeelronde(): void {
    this.speelrondeService.GetCurrentSpeelronde().subscribe((speelronde) => {
      this.speelronde = speelronde;
    });
  }

  getSpeellocaties() : void {
    this.pouleService.getAllSpeellocaties().subscribe((locaties) => {
      this.speellocaties = locaties
    })
  }

  getOverlappingPlayers(): void {
    this.pouleService.getOverlappingPlayers().subscribe((overlappingItems) => {
      this.overlappingItems = overlappingItems
    })
  }

  editTeam(team: Team = null): void {
    const config = new MatDialogConfig<Team>();
    config.width = '400px';
    config.disableClose = true;
    config.data = team || new Team();

    const dialogRef = this.dialog.open<EditTeamDialogComponent, Team, Team>(
      EditTeamDialogComponent,
      config
    );
    dialogRef.afterClosed().subscribe((team) => {
      this.getAllTeams();
      this.getCurrentSpeelronde();
    });
  }

  deleteTeam(team: Team): void {
    const config = new MatDialogConfig<Team>();
    config.data = team;

    const dialogRef = this.dialog.open<DeleteTeamDialogComponent, Team, Team>(
      DeleteTeamDialogComponent,
      config
    );
    dialogRef.afterClosed().subscribe(() => {
      this.getAllTeams();
    });
  }

  addSpeelronde(): void {
    this.speelrondeService.AddSpeelronde().subscribe(() => {
      this.getCurrentSpeelronde();
    });
  }

  deleteSpeelronde(): void {
    this.speelrondeService.DeleteSpeelronde().subscribe(() => {
      this.getCurrentSpeelronde();
    });
  }

  addPoule(categorie: any): void {
    const newPoule = new Poule({ categorie });
    this.pouleService.addPoule(newPoule).subscribe(() => {
      this.getCurrentSpeelronde();
    });
  }

  addTeamToPoule(change: MatSelectChange, poule): void {
    this.pouleService.addTeamToPoule(poule, change.value).subscribe(() => {
      this.getCurrentSpeelronde();
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.teams.filter = filterValue.trim().toLowerCase();
  }

  getSpelers(team: Team): string {
    return team.spelers
      .map((element) => {
        return element.naam;
      })
      .join(', ');
  }

  getCategorieText(team: Team): String {
    return Categorie[team.categorie];
  }
}
