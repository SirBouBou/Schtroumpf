import { Injectable } from '@angular/core';
import { WebService } from './web.service';
import Smurfs from './models/smurfs';

@Injectable({
  providedIn: 'root'
})
export class SmurfService {

  constructor(private webService: WebService) { }

  /**
   * Permet d'appeler la backend pour récupérer tous les Schtroumpfs dans la base de données
   * 
   * @returns Le resultat de la requête.
   */
  getSmurfs() {
    return this.webService.get('app/smurf');
  }

  /**
   * Permet d'appeler la backend pour récupérer un Schtroumpf grâce à son id dans la base de données.
   * 
   * @param smurfId - Un string contenant l'id d'un Schtroumpf.
   * @returns Le resultat de la requête.
   */
  getSmurf(smurfId: string) {
    return this.webService.get(`app/smurf/${smurfId}`);
  }

  /**
   * Permet d'appeler la backend pour crée un nouvel utilisateur et son Schtroumpf associé. 
   * 
   * @param login - Le nom du compte de l'utilisateur.
   * @param pass - Son mot de passe.
   * @param pseudo - Le nom d'utilisateur aka le nom qui sera affiché publiquement.
   * @param age - L'age de l'utlisateur.
   * @param nourriture - La nourriture préférée de l'utilisateur.
   * @param famille - La famille du Schtroumpf de l'utilisateur (ex: Schtroumf Cuisinier, Schtroumf Musicien...).
   * @returns Le resultat de la requête.
   */
  createAuth(login: string, pass: string, pseudo: string, age: number, nourriture: string, famille: string) {
    return this.webService.post('app/newUser', { login: login, pass: pass, pseudo: pseudo, age: age, nourriture: nourriture, famille: famille});
  }


  /**
   * Permet d'appeler la backend pour connecter un utilisateur.
   * 
   * @param login - Le nom du compte de l'utilisateur.
   * @param pass - Son mot de passe.
   * @returns Le resultat de la requête
   */
  connect(login: string, pass: string) {
    return this.webService.post('app/login', {login: login, pass: pass});
  }

  /**
   * Permer d'ajouter un ami au Schtroumpf de l'utilisateur connecté.
   * 
   * @param smurfId - L'id de l'ami a ajouter.
   * @param id - L'id de l'utilisateur.
   * @returns Le resultat de la requête.
   */
  ajouteAmi(smurfId: string, id: string) {
    return this.webService.post(`app/smurf/${smurfId}`, {id: id});
  }
}
