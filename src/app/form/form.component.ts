import { Component, OnInit } from '@angular/core';
import { EmailValidator, FormControl , FormGroup, Validators } from '@angular/forms';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  /*name = new FormControl('');*/

  form=new FormGroup({
    name: new FormControl('', [
      Validators.maxLength(30), 
      Validators.pattern('[a-zA-Z ]*'),
      Validators.required
      ]),
    email: new FormControl('',[
      Validators.maxLength(30), 
      Validators.pattern(/^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i), 
      Validators.required]),
    password: new FormControl('',[Validators.required, Validators.minLength(8)]),
    country: new FormControl('',[Validators.required]),
    city: new FormControl('',[Validators.required, Validators.minLength(3)]),
    zipcode: new FormControl('',[Validators.required, Validators.maxLength(6),Validators.minLength(6), Validators.pattern('[0-9]+')]),
  });
  
  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    this.getserverdata();
  }

  onSubmit(data:any){


    if (this.form.valid) {
      
      var senddata = {
        "id": "5",
        "name": "",
        "email": "",
        "password": "",
        "country": "",
        "city": "",
        "zipcode": ""
    }

    const a = this.form.value;

    senddata.name = a.name;
    senddata.email = a.email;
    senddata.password = a.password;
    senddata.country = a.country;
    senddata.city = a.city;
    senddata.zipcode = a.zipcode;

    console.log('sendata',senddata);

    console.log(a);
      
      this.http.post('https://5ffe6b2fa4a0dd001701aad4.mockapi.io/api/adduser', senddata)
        .subscribe((res: any) =>{
          console.log(res);
          if (res) {
            this.getserverdata();
          }
        } ,
        (err: any) => console.log(err));
    }
  }

  onChange(e:any) {
    console.log(e.target.value);
  }

  get name(){
    return this.form.get('name');
  }
 
  get email(){
    return this.form.get('email');
  }

  get password(){
    return this.form.get('password');
  }

  get country(){
    return this.form.get('country');
  }

  get city(){
    return this.form.get('city');
  }

  get zipcode(){
    return this.form.get('zipcode');
  }



  data:any;
  getserverdata(){
    this.http.get<any>('https://5ffe6b2fa4a0dd001701aad4.mockapi.io/api/adduser').subscribe(res => {
      console.log(res);
      if(res){
       this.data=res;
      }
  });
  }

}

