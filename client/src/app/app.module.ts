import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
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
import { TelaCadastroUsuarioComponent } from './pages/usuario/tela-cadastro-usuario/tela-cadastro-usuario.component';
import { TelaLoginUsuarioComponent } from './pages/usuario/tela-login-usuario/tela-login-usuario.component';
import { PasswordModule } from 'primeng/password';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { InputOtpModule } from 'primeng/inputotp';
import { TelaCadastroPalavraComponent } from './pages/palavra/tela-cadastro-palavra/tela-cadastro-palavra.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FileUploadModule } from 'primeng/fileupload';
import { ImageModule } from 'primeng/image';
import { AppSidebarComponent } from './components/app-sidebar/app-sidebar.component';
import { PaginaInicialUsuarioComponent } from './pages/usuario/pagina-inicial-usuario/pagina-inicial-usuario.component';
import { AppMenuitemComponent } from './components/app-menuitem/app-menuitem.component';
import { TelaPerfilUsuarioComponent } from './pages/usuario/tela-perfil-usuario/tela-perfil-usuario.component';
import { TelaListaPalavraComponent } from './pages/palavra/tela-lista-palavra/tela-lista-palavra.component';
import { TelaListaTurmaComponent } from './pages/turma/tela-lista-turma/tela-lista-turma.component';
import { TelaCadastroTurmaComponent } from './pages/turma/tela-cadastro-turma/tela-cadastro-turma.component';
import { DividerModule } from 'primeng/divider';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { AutoComplete, AutoCompleteModule } from 'primeng/autocomplete';
import { TelaListaPersonagemComponent } from './pages/personagem/tela-lista-personagem/tela-lista-personagem.component';
import { TelaCadastroPersonagemComponent } from './pages/personagem/tela-cadastro-personagem/tela-cadastro-personagem.component';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';

@NgModule({
    // schemas: [CUSTOM_ELEMENTS_SCHEMA],
    declarations: [
        AppComponent,
        AppHeaderComponent,
        AppSidebarComponent,
        AppMenuitemComponent,
        PaginaInicialComponent,
        PaginaInicialUsuarioComponent,
        JogoAdivinhacaoComponent,
        JogoAlfabetoManualComponent,
        JogoMemoriaComponent,
        FeedbackComponent,
        TelaCadastroUsuarioComponent,
        TelaCadastroPalavraComponent,
        TelaListaPalavraComponent,
        TelaCadastroTurmaComponent,
        TelaListaTurmaComponent,
        TelaLoginUsuarioComponent,
        TelaPerfilUsuarioComponent,
        TelaListaPersonagemComponent,
        TelaCadastroPersonagemComponent
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
        FileUploadModule,
        FormsModule,
        InputTextModule,
        InputOtpModule,
        InputNumberModule,
        ImageModule,
        MenuModule,
        ToastModule,
        PasswordModule,
        RadioButtonModule,
        DividerModule,
        PanelModule,
        TableModule,
        AutoCompleteModule,
        CalendarModule,
        DialogModule
    ],
    providers: [provideHttpClient(withInterceptorsFromDi())],
    bootstrap: [AppComponent]
})
export class AppModule { }
