import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { setCookie } from 'src/app/cookie-typescript-utils';
import { SmurfService } from 'src/app/smurf.service';


@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.scss']
})
export class LoginUserComponent implements OnInit {

  res: string = "";

  constructor(private smurfService: SmurfService, private router: Router) { }

  ngOnInit(): void {
  }

  /**
   * Vérifie que les entrées données par l'utilisateur soient valides puis verifie si les données correspondent à des données présentes dans la base.
   * Si oui, la fonction crée un cookie avec les informations de connections et retourne à la page d'acceuil.
   * Si non, elle envoie une alerte à l'utilisateur.
   * 
   * @param login - Le nom du compte de l'utilisateur.
   * @param pass - Le mot de passe du compte de l'utilisateur.
   * 
   * @returns void
   */

  connect(login: string, pass: string) {
    if(login == '' || pass == '')
      alert("Veuillez renseigner tout les champs");
    else
      this.smurfService.connect(login, pass).subscribe((val: any) => this.res = val); 
    setTimeout(() => {
      if(this.res == "false") {
        alert("Login invalide");
      } else {
        setCookie("connected", this.res);
        this.router.navigate(['./']);
      }
        
    }, 1000)
  }
}
