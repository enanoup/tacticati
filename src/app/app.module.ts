import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SapComponent } from './pages/sap/sap.component';
import { AnaliticaComponent } from './pages/analitica/analitica.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common'; 
import { HttpClientModule } from '@angular/common/http';
import { MenuComponent } from './pages/menu/menu.component';
import { FooterComponent } from './pages/footer/footer.component';
import { NosotrosComponent } from './pages/nosotros/nosotros.component';
import { AvisoDePrivacidadComponent } from './pages/aviso-de-privacidad/aviso-de-privacidad.component';

import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    SapComponent,
    AnaliticaComponent,
    MenuComponent,
    FooterComponent,
    NosotrosComponent,
    AvisoDePrivacidadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RecaptchaModule,
    RecaptchaFormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
