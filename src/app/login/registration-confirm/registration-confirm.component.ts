import { Component, OnInit } from '@angular/core';
import { UserRegister } from 'src/app/models/userRegister';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-registration-confirm',
  templateUrl: './registration-confirm.component.html',
  styleUrls: ['./registration-confirm.component.css']
})
export class RegistrationConfirmComponent implements OnInit {

  user:UserRegister;

  constructor(
    private loginService : LoginService) {}

  ngOnInit() {
    this.user = {
      id : this.loginService.editUser.id,
      businessUnitId :this.loginService.editUser.businessUnitId,
      firstName : this.loginService.editUser.firstName,
      lastName:this.loginService.editUser.lastName,
      address : this.loginService.editUser.address,
      email : this.loginService.editUser.email,
      telephone : this.loginService.editUser.telephone,
      title : this.loginService.editUser.title,
      created_on :this.loginService.editUser.created_on

    }
  }
  print(){
  
    const printContent = document.getElementById("confirmCard");
    const WindowPrt = window.open('', '', 'left=0,top=0,width=900,height=900,toolbar=0,scrollbars=0,status=0');
    WindowPrt.document.write(printContent.innerHTML);
    WindowPrt.document.write('<style>#confirmCard{text:align:center}</style>');
    WindowPrt.document.close();
    WindowPrt.focus();
    WindowPrt.print();
    WindowPrt.close();
  }

}