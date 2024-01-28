import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConnexionComponent } from './components/connexion/connexion.component';
import { PageArticleComponent } from './components/page-article/page-article.component';
import { InscriptionComponent } from './components/inscription/inscription.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  { path: 'connexion', component: ConnexionComponent },
  {path :'article',component: PageArticleComponent},
  {path :'inscription',component: InscriptionComponent},
  {path :'dashboard',component: DashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
