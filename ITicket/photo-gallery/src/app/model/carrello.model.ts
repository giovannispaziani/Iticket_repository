import {Utente} from './utente.model';
import {Evento} from './evento.model';

export class Carrello {
    id: number;
    titolo: string;
    quantita : number;
    docenteCorrelato: Utente;
    eventoCorrelato: Evento;
    prezzo : number;

}
