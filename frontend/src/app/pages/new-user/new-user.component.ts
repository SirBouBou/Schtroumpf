import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SmurfService } from 'src/app/smurf.service';
import { getCookie } from 'src/app/cookie-typescript-utils';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})


export class NewUserComponent implements OnInit {

  constructor(private smurfService: SmurfService, private router: Router) { }

  ngOnInit(): void {
  }

  /**
   * Vérifie que les données entrées par l'utilisateur soientt valides puis crée un profil et son schtroumpf associé
   * 
   * @remarks Une fonction de verification de l'unicité du login et/ou du pseudo peut être utile si il y a un plus grand nombre de données.
   * 
   * @param login - Le nom du compte de l'utilisateur.
   * @param pass - Son mot de passe.
   * @param pseudo - Le nom d'utilisateur aka le nom qui sera affiché publiquement.
   * @param age - L'age de l'utlisateur.
   * @param nourriture - La nourriture préférée de l'utilisateur.
   * @param famille - La famille du Schtroumpf de l'utilisateur (ex: Schtroumf Cuisinier, Schtroumf Musicien...).
   * 
   * @returns void
  */
  verifieAuth(login: string, pass: string, passV: string, pseudo: string, age: string, nourriture: string, famille: string) {

    if(login.length == 0 || pass.length == 0 || passV.length == 0 || pseudo.length == 0 || age.length == 0 || nourriture.length == 0 || famille == "0") {
      alert("N'oubliez pas de renseigner tous les champs");
    }
    else if(pass !== passV)
      alert("Les mots de passe ne correspondent pas");
    else if (pass.length < 5 || pass === pass.toLowerCase())
      alert("Votre mot de passe est invalide.\n(Au moins 5 caractères dont une majuscule)");
    else if(isNaN(parseInt(age)))
      alert("Votre age est incorrect");

    else {
      var test1 = "";
      let smurfid = "";
      this.smurfService.createAuth(login, pass, pseudo, parseInt(age), nourriture, famille).subscribe((text: any) => smurfid = text);
      setTimeout(() => {
        console.log(smurfid);
        let cookie = getCookie("connected");
          if(cookie != false && typeof (cookie) === 'string') { 
            this.smurfService.ajouteAmi(smurfid, cookie).subscribe((val: any) => test1 = val);
            setTimeout(() => {
              if(typeof test1 === 'object')  {
                alert("Ami ajouté !");
              } else {
                alert("Vous êtes déja amis avec cette personne");
              }
            }, 100)  
          }
        alert("Inscription réussie");
        this.router.navigate(['./']);
      }, 500)
    }
  }
}
