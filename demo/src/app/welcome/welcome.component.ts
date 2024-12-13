import { Component } from '@angular/core';
import { TravelService } from '../services/travel.service';
import { Travel } from '../models/travel';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {
  details:Travel[]=[];
  formgroup!:FormGroup
  constructor(private service:TravelService,private fb:FormBuilder){}
  ngOnInit():void{}
  loaddetails():void{
    this.service.getall().subscribe(data=>this.details=data);
  }
  validations(){
    this.formgroup=this.fb.group({
      id:[null],
      name:['',[Validators.required,Validators.minLength(4),Validators.maxLength(15)]],
      title:['',[Validators.required,Validators.minLength(4),Validators.maxLength(15)]],
      alt:['',[Validators.required,Validators.minLength(4),Validators.maxLength(15)]],
      description:['',[Validators.maxLength(40)]]
    })
  }
  delete(id:number | undefined):void{
    if(id!==undefined){
      this.service.delete(id).subscribe(()=>{
        this.loaddetails();
      })
    }
  }

}
