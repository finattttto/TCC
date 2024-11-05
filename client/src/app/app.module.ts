import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { DockModule } from 'primeng/dock';
import { DragDropModule } from 'primeng/dragdrop';
import { JogoAdivinhacaoComponent } from './pages/jogo-adivinhacao/jogo-adivinhacao.component';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { PaginaInicialComponent } from './pages/pagina-inicial/pagina-inicial.component';
import { InputTextModule } from 'primeng/inputtext';
import { AppHeaderComponent } from './pages/app-header/app-header.component';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { ToastModule } from 'primeng/toast';
import { JogoAlfabetoManualComponent } from './pages/jogo-alfabeto-manual/jogo-alfabeto-manual.component';
import { JogoMemoriaComponent } from './pages/jogo-memoria/jogo-memoria.component';

@NgModule({
    declarations: [
        AppComponent,
        AppHeaderComponent,
        PaginaInicialComponent,
        JogoAdivinhacaoComponent,
        JogoAlfabetoManualComponent,
        JogoMemoriaComponent
    ],
    imports: [
        BrowserModule,
        RouterOutlet,
        RouterModule.forRoot(routes),
        DockModule,
        InputTextModule,
        DragDropModule,
        FormsModule,
        ButtonModule,
        AvatarModule,
        AvatarGroupModule,
        CardModule,
        ToastModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
