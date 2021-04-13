import { Component, OnInit } from '@angular/core';
import { deleteCookie, getCookie } from 'src/app/cookie-typescript-utils';
import Smurfs from 'src/app/models/smurfs';
import { SmurfService } from 'src/app/smurf.service';

@Component({
  selector: 'app-smurf-village',
  templateUrl: './smurf-village.component.html',
  styleUrls: ['./smurf-village.component.scss']
})

export class SmurfVillageComponent implements OnInit {
  liste: Smurfs[][] = [];
  smurfs: Smurfs[] = [];
  temp: Smurfs[] = [];
  amis: Smurfs[] = [];
  i: number;
  mysmurf: string = "";
  constructor(private smurfService: SmurfService) { 
    this.i = 0;
  }

  ngOnInit(): void {
    this.smurfService.getSmurfs()
      .subscribe((smurfs: any) => this.smurfs = smurfs);
  }

  /**
   * Permet de diviser la liste de tous les utilisateurs en paquets de 6 pour pouvoir faire un affichage correct.
   * 
   * @returns true 
   */
  diviseListe() {
    this.i = 0;
    for (let smurf of this.smurfs) {
      if((this.i % 6) == 0 && this.i != 0) {
        this.liste[Math.floor(this.i/6)] = this.temp;
        this.temp = [];
      }
      this.temp[this.i % 6] = smurf
      this.i++;
    }
    if (this.temp != []) {
      this.liste[Math.floor(this.i/6)+1] = this.temp;
    }

    return true;
  }

  /**
   * Retourne l'url de l'image petit format associé à une famille de schtroumpf.
   * 
   * @param famille - La famille d'un Schtroumpf
   * @returns Un String contenant des instructions utilisé par l'attribut background d'une balise de style.
   */

  getPic(famille: string) {
    if(famille == "Grand Schtroumpf")
      return " url(assets/lilGrandS.jpeg) no-repeat";
    else if (famille == "Schtroumpf a Lunettes")
      return " url(assets/lilLunettesS.jpg) no-repeat"; 
    else if (famille == "Schtroumpf Paresseux")
      return " url(assets/lilLazyS.jpg) no-repeat"; 
    else if (famille == "Schtroumpfette")
      return " url(assets/lilSmurfette.jpg) no-repeat"; 
    else if (famille == "Schtroumpf Beta")
      return " url(assets/lilDopeyS.jpg) no-repeat";
    else if (famille == "Schtroumpf Cuisinier")
      return " url(assets/lilCuisineS.jpg) no-repeat"; 
    else if (famille == "Schtroumpf Peureux")
      return " url(assets/lilPeureuxS.jpg) no-repeat";
    else if (famille == "Schtroumpf Costaud")
      return " url(assets/lilCostaudS.jpg) no-repeat";  
    else if (famille == "Schtroumpf Grognon")
      return " url(assets/lilGrognonS.jpg) no-repeat";
    else if (famille == "Schtroumpf Musicien")
      return " url(assets/lilMusicS.jpg) no-repeat"; 
    else 
      return " url(assets/lilSmurf.jpeg) no-repeat";
  }

  /**
   * Permet de tester si un utilisateur est connecté en verifiant les cookies.
   * Si un utilisateur est connecté, recupère l'id de son Schtroumpf dans la variable mysmurf.
   * Sinon efface la variable mysmurf pour éviter toute erreur.
   * 
   * @returns true si un utilisateur N'EST PAS connecté, return false sinon.
   */

  testConnected() {
    let cookie = getCookie("connected");
    if(cookie == false) {
      this.mysmurf = "";
      return true;
    } 
    if (typeof (cookie) === 'string')
      this.mysmurf = cookie;
    return false;
  }

  /**
   * Permet de deconnecter l'utilisateur.
   */

  deconnexion() {
    deleteCookie("connected");
  }
}
