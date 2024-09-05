import { HttpClientModule } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PokeapiService } from '../../servicios/pokeapi.service';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [HttpClientModule, MatCardModule, MatButtonModule], //En un futuro esta parte cambiara ASI QUE PENDIENTE DE VER EN QUE CAMBIA
  providers: [PokeapiService],
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.scss'
})
export class ListaComponent implements OnInit{
listaPokemones: any;
pokemonesCompleto: any[] = []
EsShiny : number = 0

  cdr: any;
constructor(private pokeApi: PokeapiService, cdr: ChangeDetectorRef){}

ngOnInit(): void {
  this.cargarPokemon();
  this.cdr.detectChanges(); // Forzar detección de cambios
}

cargarPokemon() {  //Funcion para traer cargar y enviar la informacion traida de la URL
  this.pokeApi.obtenerListadoPokemones().subscribe({ //Se usa el metodo subscribe para poder ver el observador traido de la pokeApi service
  next: (data: any) => {
    this.listaPokemones = data; // se pasa la data a lista pokemon
    this.listaPokemones.results.forEach( (element: any) => { //se hace un ForEach a cada url del pokemon para que traiga los datos
      this.pokeApi.obtenerUnPokemon(element.url).subscribe({ // despues se hace el subscribe para mandar los datos
  next: (data: any) => {
    this.pokemonesCompleto.push(data)

  },
  })
});
console.log(this.listaPokemones);
console.log(this.pokemonesCompleto)
},
error: (err: any) => {console.log(err)}
})}

nextPage(nextUrl: string): void {
this.pokeApi.urlApi = nextUrl
this.pokemonesCompleto = []
this.cargarPokemon()
}

previousPage(previousUrl: string): void {
  this.pokeApi.urlApi = previousUrl
  this.pokemonesCompleto = []
  this.cargarPokemon()
  }


playSound(soundSource: string){
const audio = new Audio();
audio.src = soundSource;
audio.load();
audio.play();
}

capitalizeFirstLetter(name: string): string {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

CambiarAShiny(){
  this.EsShiny = 1
}

CambiarANormal(){
  this.EsShiny  = 0
}

}
