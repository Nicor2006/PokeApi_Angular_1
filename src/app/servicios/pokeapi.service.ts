import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PokeapiService {
urlApi = "https://pokeapi.co/api/v2/pokemon/" // INYECCION DE DEPENDENCIA TIENE QUE SER PRIVADA
  constructor(private http : HttpClient) { } //Las inyecciones siempre van en el constructor

  obtenerListadoPokemones(){
    return this.http.get(this.urlApi) //DEVUELVE UN OBSERVABLE
  }

  obtenerUnPokemon(url : string){
    return this.http.get(url)
  }
}
