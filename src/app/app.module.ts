import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './user/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField } from '@angular/material/form-field';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RegisterComponent } from './user/register/register.component';
import { PerfilComponent } from './user/perfil/perfil.component';
import { HomeComponent } from './profesor/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { MatOption } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { MainComponent } from './main/main.component';
import {MatIconModule} from '@angular/material/icon';
import { NuevoejercicioComponent } from './profesor/nuevoejercicio/nuevoejercicio.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatPaginatorModule} from '@angular/material/paginator';
import { BloquesComponent } from './profesor/bloques/bloques.component';
import { NuevoBloqueComponent } from './profesor/nuevo-bloque/nuevo-bloque.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PerfilComponent,
    HomeComponent,
    MainComponent,
    NuevoejercicioComponent,
    BloquesComponent,
    NuevoBloqueComponent
  ],
  imports: [
    MatPaginatorModule,
    MatIconModule,MatDialogModule,
    HttpClientModule,
    MatSelectModule,
    RouterModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
