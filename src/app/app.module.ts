import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SidebarComponent } from './features/sidebar/sidebar.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { BeneficiariesComponent } from './features/beneficiaries/components/beneficiaries.component';
import { ContextBarComponent } from './features/context-bar/components/context-bar.component';
import { AddBeneficiaryModalComponent } from './features/beneficiaries/components/add-beneficiary-modal/add-beneficiary-modal.component';
import { BeneficiaryFormComponent } from './features/beneficiaries/components/beneficiary-form/beneficiary-form.component';
import { EditBeneficiaryModalComponent } from './features/beneficiaries/components/edit-beneficiary-modal/edit-beneficiary-modal.component';

//PrimeNG imports
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ModalComponent } from './core/components/modal/modal.component';
import { StatusModalComponent } from './core/components/modal/status-modal/status-modal.component';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { SelectButtonModule } from 'primeng/selectbutton';
import { CalendarModule } from 'primeng/calendar';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { ChipModule } from 'primeng/chip';
import { ChipsModule } from 'primeng/chips';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    DashboardComponent,
    BeneficiariesComponent,
    ContextBarComponent,
    ModalComponent,
    StatusModalComponent,
    AddBeneficiaryModalComponent,
    BeneficiaryFormComponent,
    EditBeneficiaryModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    
    // PrimeNg imports
    TableModule,
    CardModule,
    ButtonModule,
    DropdownModule,
    InputTextModule,
    SelectButtonModule,
    CalendarModule,
    InputGroupModule,
    InputGroupAddonModule,
    ChipModule,
    ChipsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
