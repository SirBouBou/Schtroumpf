import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { getCookie } from 'src/app/cookie-typescript-utils';
import Smurfs from 'src/app/models/smurfs';
import { SmurfService } from 'src/app/smurf.service';

@Component({
  selector: 'app-smurf-view',
  templateUrl: './smurf-view.component.html',
  styleUrls: ['./smurf-view.component.scss']
})

export class SmurfViewComponent implements OnInit {

  smurfs: Smurfs = new Smurfs();
  amis: Smurfs[] = [];
  smurfId!: string;
  nbAmis: number = 0;
  mysmurf: string = "";

  constructor(private SmurfService: SmurfService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.smurfId = params.smurfId;
      if (!this.smurfId) return;
      this.SmurfService.getSmurf(this.smurfId).subscribe((smurfs: any) => this.smurfs = smurfs[0]);
    })
    setTimeout(() => {
      for(let ids of (this.smurfs.amis)) {
        this.nbAmis++;
        if (!ids) return;
        this.SmurfService.getSmurf(ids).subscribe((smurfs: any) => this.amis.push(smurfs[0]));
      }      
    }, 100)
  }

  /**
   * Retourne l'url de l'image grand format associé à une famille de schtroumpf.
   * 
   * @param famille - La famille d'un Schtroumpf
   * @returns Un String contenant des instructions utilisé par l'attribut background d'une balise de style.
   */

  getBigPic(famille: string) {
    if(famille == "Grand Schtroumpf")
      return " url(assets/GrandS.jpg) no-repeat";
    else if (famille == "Schtroumpf a Lunettes")
      return " url(assets/LunettesS.jpg) no-repeat"; 
    else if (famille == "Schtroumpf Paresseux")
      return " url(assets/LazyS.jpg) no-repeat"; 
    else if (famille == "Schtroumpfette")
      return " url(assets/Smurfette.jpg) no-repeat"; 
    else if (famille == "Schtroumpf Beta")
      return " url(assets/DopeyS.jpg) no-repeat";
    else if (famille == "Schtroumpf Cuisinier")
      return " url(assets/CuisineS.png) no-repeat"; 
    else if (famille == "Schtroumpf Peureux")
      return " url(assets/PeureuxS.jpg) no-repeat";
    else if (famille == "Schtroumpf Costaud")
      return " url(assets/CostaudS.jpg) no-repeat";  
    else if (famille == "Schtroumpf Grognon")
      return " url(assets/GrognonS.jpg) no-repeat";
    else if (famille == "Schtroumpf Musicien")
      return " url(assets/MusicS.jpg) no-repeat"; 
    else 
      return " url(assets/Smurf.jpeg) no-repeat";
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
   * Permet l'ajout d'un ami directement par le profil de celui si lorsque un utilisateur est connecté.
   * 
   * @return void
   */

  ajouteAmi() {
    let cookie = getCookie("connected");
    if(cookie != false && typeof (cookie) === 'string') {
      if(cookie != this.smurfId)
        var test = "";
        this.SmurfService.ajouteAmi(this.smurfId, cookie).subscribe((val: any) => test = val);
        setTimeout(() => {
          if(typeof test === 'object')  {
            alert("Ami ajouté !");
          } else {
            alert("Vous êtes déja amis avec cette personne");
          }
        }, 100)   
    }
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
   * Redirige discretement l'utilisateur deux fois pour recharger les informations.
   * 
   * @param url - L'url finale sur laquelle l'utilisateur doit etre emmené
   */

  redirectTo(url: string[]) {
    this.router.navigateByUrl('/', {skipLocationChange: true})
    .then(() => this.router.navigate(url));
  }

  /**
   * Redirige l'utilisateur sur la page principale du site.
   */

  home() {
    this.router.navigateByUrl('/', {skipLocationChange: true})
  }

}
