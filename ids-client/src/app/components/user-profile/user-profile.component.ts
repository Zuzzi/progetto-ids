import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/services/auth/auth.service';
import { User } from '@app/interfaces';
import { FormGroup, FormControlName } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { formGroupNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';
import { formControlBinding } from '@angular/forms/src/directives/ng_model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  modificaUserForm : FormGroup;
  private user: User;

  constructor(private authService: AuthService, private formBuilder: FormBuilder) { 
    this.user = new User();
  }

  ngOnInit() {

    this.user = this.authService.getUser();

    this.modificaUserForm = this.formBuilder.group({
      nome: [this.user.nome],
      cognome: [this.user.cognome],
      data: [this.user.data],
      codiceFiscale: [this.user.codiceFiscale],
      residenza: [this.user.residenza],
      email: [this.user.email],
      telefono: [this.user.telefono],
      citta: [this.user.citta],
      provincia: [this.user.provincia],
      CAP: [this.user.CAP],
    })
  }

  setUser() {
    let usermod: User;
    usermod = new User();

    console.log('valori tasto conferma: ' + this.modificaUserForm.controls.nome.value)

    usermod.nome = this.modificaUserForm.controls.nome.value;
    usermod.cognome = this.modificaUserForm.controls.cognome.value;
    usermod.data = this.modificaUserForm.controls.data.value;
    usermod.codiceFiscale = this.modificaUserForm.controls.codiceFiscale.value;
    usermod.residenza = this.modificaUserForm.controls.residenza.value;
    usermod.email = this.modificaUserForm.controls.email.value;
    usermod.telefono = this.modificaUserForm.controls.telefono.value;
    usermod.citta = this.modificaUserForm.controls.citta.value;
    usermod.provincia = this.modificaUserForm.controls.provincia.value;
    usermod.CAP = this.modificaUserForm.controls.CAP.value;

    this.authService.setUser(usermod);
  }

}
