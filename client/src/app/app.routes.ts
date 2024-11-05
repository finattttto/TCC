import { Routes } from "@angular/router";
import { PaginaInicialComponent } from "./pages/pagina-inicial/pagina-inicial.component";
import { JogoAdivinhacaoComponent } from "./pages/jogo-adivinhacao/jogo-adivinhacao.component";
import { JogoAlfabetoManualComponent } from "./pages/jogo-alfabeto-manual/jogo-alfabeto-manual.component";
import { JogoMemoriaComponent } from "./pages/jogo-memoria/jogo-memoria.component";

export const routes: Routes = [
    { path: '', component: PaginaInicialComponent },
    { path: 'adivinhacao', component: JogoAdivinhacaoComponent },
    { path: 'alfabeto-manual', component: JogoAlfabetoManualComponent },
    { path: 'jogo-memoria', component: JogoMemoriaComponent },
    { path: '**', redirectTo: '' }
];