  
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserRegister } from 'src/app/models/userRegister';
import { stringify } from 'querystring';
import { user } from 'src/app/models/user.interface';
import { Admin } from 'src/app/models/admin';
import { Observable } from 'rxjs';

@Injectable()
export class LoginService {

  url :string = "https://raw.githubusercontent.com/sagarshirbhate/Country-State-City-Database/master/Contries.json";

  constructor(private http:HttpClient) { }

  allCountries(): Observable<any>{
    return this.http.get(this.url);
  }
  
  getUserByEmail(email:string) {
    return this.http.get<user>(`http://localhost:8081/nagarroTravelsApi/userByEmail?email=${email}`); 
  }

  getAllBusinessUnits(){
    return this.http.get(`http://localhost:8081/nagarroTravelsApi/BusinessUnits`);

  }

  getAdminByEmail(email:string){
    return this.http.get<Admin>(`http://localhost:8081/nagarroTravelsApi/adminByEmail?email=${email}`); 
  }

  registerUser(user : UserRegister){

    return this.http.post('http://localhost:8081/nagarroTravelsApi/users',user,{observe: 'response'})

  }

  sendConformationMail(username:string,password:string){
    
    let subject = "Registration successful"  ; 
    let text = "<h2> You have successfully registered to Nagarro travels</h2>"+
          "<br> Your credentials are mentioned below. Please do not share it with anyone"+
          "<br><br><b>Username </b>: "+username+
          "<br><b>Password </b>: "+password+"<br><br>Thank you,<br>Nagarro Travels Team"

    subject = encodeURIComponent(subject); 
    text = encodeURIComponent(text)


    return this.http.get(`http://localhost:8081/nagarroTravelsApi/send-mail?email=${username}&subject=${subject}&text=${text}`); 
    
  }

  sendForgotPasswordMail(username:string,password:string){
    
    let subject = "Nagarro Travels Credentials"  ; 
    let text = "You have requested your user name and password for the your access to the Nagarro Travels:<br><br><b>Username</b>: "+username+
    "<br><b>Password</b> : "+password+"<br><br>Please contact the Travel team if you have any questions.<br><br>Thank you,<br>Nagarro Travels Team";
    

    subject = encodeURIComponent(subject); 
    text = encodeURIComponent(text)


    return this.http.get(`http://localhost:8081/nagarroTravelsApi/send-mail?email=${username}&subject=${subject}&text=${text}`); 
    
  }


}