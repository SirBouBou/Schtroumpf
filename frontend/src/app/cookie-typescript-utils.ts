/**
 * Permet de créer un cookie, utilisé pour stocker les variables de connections de l'utilsateur pour une durée de 7 jours.
 * 
 * @param name - Le nom du cookie
 * @param val - La valeur du cookie
 * 
 * @returns void
 */

export function setCookie(name: string, val: string) {
    const date = new Date();
    const value = val;
    date.setTime(date.getTime() + (7 * 24 * 60 * 60 * 1000));
    document.cookie = name+"="+value+"; expires="+date.toUTCString()+"; path=/; SameSite=Lax";
}

/**
 * Permet de récupérer un cookie avec son nom pour pouvoir lire sa valeur.
 * 
 * @param name - Le nom du cookie
 * 
 * @returns La valeur du cookie si le cookie est valide et qu'il possède une valeur (string), false sinon.
 */

export function getCookie(name: string) {
    const value = "; " + document.cookie;
    const parts = value.split("; " + name + "=");
    
    if (parts.length === 2) {
        const ppop = parts.pop();
        if (ppop) {
            return ppop.split(";").shift();
        }
    }

    return false;
}

/**
 * Permet de supprimer un cookie instantanément en remplaçant sa date de destruction par une date antérieure à sa création.
 * 
 * @param name - Le nom du cookie
 * 
 * @returns void
 */

export function deleteCookie(name: string) {
    const date = new Date();
    date.setTime(date.getTime() + (-1 * 24 * 60 * 60 * 1000));
    document.cookie = name+"=; expires="+date.toUTCString()+"; path=/";
}