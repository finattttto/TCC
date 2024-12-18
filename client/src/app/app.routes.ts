import { Routes } from "@angular/router";
import { PaginaInicialComponent } from "./pages/pagina-inicial/pagina-inicial.component";
import { JogoAdivinhacaoComponent } from "./pages/jogo-adivinhacao/jogo-adivinhacao.component";
import { JogoAlfabetoManualComponent } from "./pages/jogo-alfabeto-manual/jogo-alfabeto-manual.component";
import { JogoMemoriaComponent } from "./pages/jogo-memoria/jogo-memoria.component";
import { TelaLoginUsuarioComponent } from "./pages/usuario/tela-login-usuario/tela-login-usuario.component";
import { TelaCadastroUsuarioComponent } from "./pages/usuario/tela-cadastro-usuario/tela-cadastro-usuario.component";
import { TelaCadastroPalavraComponent } from "./pages/palavra/tela-cadastro-palavra/tela-cadastro-palavra.component";
import { PaginaInicialUsuarioComponent } from "./pages/usuario/pagina-inicial-usuario/pagina-inicial-usuario.component";
import { authGuard } from "./auth.guard";

export const routes: Routes = [
    { path: '', component: PaginaInicialComponent },
    { path: 'adivinhacao', component: JogoAdivinhacaoComponent },
    { path: 'alfabeto-manual', component: JogoAlfabetoManualComponent },
    { path: 'jogo-memoria', component: JogoMemoriaComponent },
    { path: 'login', component: TelaLoginUsuarioComponent },
    { path: 'cadastro-user', component: TelaCadastroUsuarioComponent },

    { path: 'inicio-admin', component: PaginaInicialUsuarioComponent, /*canActivate: [authGuard] */ },
    { path: '**', redirectTo: '' }
];