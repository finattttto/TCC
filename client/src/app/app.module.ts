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
import { AppHeaderComponent } from './components/app-header/app-header.component';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { ToastModule } from 'primeng/toast';
import { JogoAlfabetoManualComponent } from './pages/jogo-alfabeto-manual/jogo-alfabeto-manual.component';
import { JogoMemoriaComponent } from './pages/jogo-memoria/jogo-memoria.component';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { MenuModule } from 'primeng/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TelaCadastroUsuarioComponent } from './pages/tela-cadastro-usuario/tela-cadastro-usuario.component';
import { TelaLoginUsuarioComponent } from './pages/tela-login-usuario/tela-login-usuario.component';
import { PasswordModule } from 'primeng/password';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';


@NgModule({
    declarations: [
        AppComponent,
        AppHeaderComponent,
        PaginaInicialComponent,
        JogoAdivinhacaoComponent,
        JogoAlfabetoManualComponent,
        JogoMemoriaComponent,
        FeedbackComponent,
        TelaCadastroUsuarioComponent,
        TelaLoginUsuarioComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        RouterOutlet,
        RouterModule.forRoot(routes),
        AvatarGroupModule,
        AvatarModule,
        ButtonModule,
        CardModule,
        DockModule,
        DragDropModule,
        FormsModule,
        InputTextModule,
        MenuModule,
        ToastModule,
        PasswordModule
    ],
    providers: [provideHttpClient(withInterceptorsFromDi())],
    bootstrap: [AppComponent]
})
export class AppModule { }
