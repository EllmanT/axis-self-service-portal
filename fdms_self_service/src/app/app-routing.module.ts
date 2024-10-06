import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './components/authentication/login/login.component';
import {InternalErrorComponent} from './components/common/internal-error/internal-error.component';
import {NotFoundComponent} from './components/common/not-found/not-found.component';
import {AuthGuard} from "./auth.guard";
import {DashboardComponent} from "./components/administrator/dashboard/dashboard.component";
import {LogoutComponent} from "./components/authentication/logout/logout.component";
import { StepperComponent } from './components/administrator/stepper/stepper.component';
import { HelpDeskComponent } from './components/administrator/help-desk/help-desk.component';
import { TicketChecker2000Component } from './components/administrator/ticket-checker2000/ticket-checker2000.component';
import { ConfirmComponentComponent } from './components/administrator/confirm-component/confirm-component.component';
import {MainComponent} from "./components/docsAi/main/main.component";
import {TablesComponent} from "./components/docsAi/tables/tables.component";
import {KeyValuePairsComponent} from "./components/docsAi/key-value-pairs/key-value-pairs.component";
import {FileUploadComponent} from "./components/docsAi/file-upload/file-upload.component";
import { CloseDayComponent } from './components/close-day/close-day.component';
import { VirtualFiscalisationComponent } from './components/virtual-fiscalisation/virtual-fiscalisation.component'; 

const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
    },

    {
        path: 'templates',
        component: FileUploadComponent,
    },
    {
        path: 'close-day',
        component: CloseDayComponent,
      },
      {
        path:'virtual-fiscalisation',
        component: VirtualFiscalisationComponent,
      }
      ,
    {
        path: 'tables',
        component: TablesComponent,
    },

    {
        path: 'key-value-pairs',
        component: KeyValuePairsComponent,
    },

    {
        path: 'main-container',
        component: StepperComponent,
    },
    {
        path: 'help-desk',
        component: HelpDeskComponent,
    },
    {
        path: 'ticket-checker-2000',
        component: TicketChecker2000Component,
    },
    {
        path: 'administrator-dashboard',
        component: DashboardComponent,
    },
    {
        path: 'confirm-request',
        component: ConfirmComponentComponent,
    },
    {
        path: 'error-500', component: InternalErrorComponent, canActivate: [AuthGuard],
    },
    {
        path: 'authentication/logout', component: LogoutComponent, canActivate: [AuthGuard],
    },
    {
        path: 'authentication/login',
        component: LoginComponent,
        // canActivate: [LoginAuthGuard],
    },
    {
        path: '**',
        component: NotFoundComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
