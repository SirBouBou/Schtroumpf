import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WebService {
  readonly ROOT_URL;
  constructor(private http: HttpClient) {
    this.ROOT_URL = "http://localhost:3000";
  }
  
  /**
   * Permet d'executer des requêtes get(récupération de données) sur la base de donnée.
   * 
   * @param url - L'url de la requête.
   * @returns Un ou plusieurs elements de la base de donnée.
   */

  get(url: string) {
    return this.http.get(`${this.ROOT_URL}/${url}`);
  }

  /**
   * Permet d'executer des requêtes post(ajout de données) sur la base de donnée.
   * 
   * @param url - L'url de la requête.
   * @param payload - Le corps envoyé à la requête au format JSON.
   * @returns L'élément qui a été ajouté à la base.
   */
  post(url: string, payload: Object) {
    return this.http.post(`${this.ROOT_URL}/${url}`, payload);
  }


/**
 * Permet d'executer des requêtes patch(modification de données) sur la base de donnée.
 * 
 * @param url - L'url de la requête
 * @param payload - Le corps envoyé à la requête au format JSON
 * @returns L'élément qui a été modifié de la base
 */
  patch(url: string, payload: Object) {
    return this.http.patch(`${this.ROOT_URL}/${url}`, payload);
  }

  /**
   * Permet d'executer des requêtes delete(suppression de données) sur la base de donnée.
   * 
   * @param url - L'url de la requête
   * @returns L'élement qui a été suppprimé
   */
  delete(url: string) {
    return this.http.delete(`${this.ROOT_URL}/${url}`);
  }

}
