import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { SapComponent } from './pages/sap/sap.component';
import { AnaliticaComponent } from './pages/analitica/analitica.component';
import { NosotrosComponent } from './pages/nosotros/nosotros.component';
import { AvisoDePrivacidadComponent } from './pages/aviso-de-privacidad/aviso-de-privacidad.component';


const routerOptions: ExtraOptions = {
  onSameUrlNavigation: 'reload',
  scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled',
  scrollOffset: [0, 64],
  // quitar este para produccion
  // useHash: true
};

const routes: Routes = [

  { path: '', component: InicioComponent },
  { path: 'nosotros', component: NosotrosComponent},
  { path: 'sapbusinessone', component: SapComponent },
  { path: 'analitica', component: AnaliticaComponent},

  { path: 'nosotros/sapbusinessone', redirectTo: '/sapbusinessone',  pathMatch: 'full'},
  { path: 'nosotros/analitica', redirectTo: '/analitica',  pathMatch: 'full'},
  { path: 'nosotros/aviso', redirectTo: '/aviso',  pathMatch: 'full'},
  { path: 'sapbusinessone/aviso', redirectTo: '/aviso',  pathMatch: 'full'},
  { path: 'analitica/aviso', redirectTo: '/aviso',  pathMatch: 'full'},
  { path: 'sapbusinessone/nosotros', redirectTo: '/nosotros',  pathMatch: 'full'},
  { path: 'analitica/nosotros', redirectTo: '/nosotros',  pathMatch: 'full'},

  { path: 'aviso', component: AvisoDePrivacidadComponent},
  { path: 'aviso/analitica', redirectTo: '/analitica',  pathMatch: 'full'},
  { path: 'aviso/sapbusinessone', redirectTo: '/sapbusinessone',  pathMatch: 'full'},
  { path: 'aviso/nosotros', redirectTo: '/nosotros',  pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
