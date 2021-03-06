import {Utente} from './utente.model';
import {TipologiaNotizia} from './tipologianotizia.model';

export class Notizia {
    id: number;
    nome: string;
    descrizione: string;
    dataPubblicazione: Date;
    tipologia: TipologiaNotizia;
    pubblicatoDa: Utente;

}
