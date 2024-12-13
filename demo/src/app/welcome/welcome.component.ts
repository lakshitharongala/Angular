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
  details: Travel[] = [];
  formgroup!: FormGroup;
  foundrecord: Travel | null = null;
  constructor(private service: TravelService, private fb: FormBuilder) {}
  ngOnInit(): void {
    this.loaddetails()
    this.validations()
  }
  loaddetails(): void {
    this.service.getall().subscribe((data) => (this.details = data));
  }
  validations() {
    this.formgroup = this.fb.group({
      id: [null],
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(15),
        ],
      ],
      title: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(15),
        ],
      ],
      alt: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(15),
        ],
      ],
      description: ['', [Validators.maxLength(40)]],
    });
  }
  delete(id: number | undefined): void {
    if (id !== undefined) {
      this.service.delete(id).subscribe(() => {
        this.loaddetails();
      });
    }
  }

  searchbyemail(email: string): void {
    this.service.searchbyemail(email).subscribe((foundrecords) => {
      if (foundrecords && foundrecords.length > 0) {
        this.foundrecord = foundrecords[0];
      } else {
        this.foundrecord = null;
        console.log(`email is not found ${email}`);
      }
    });
  }
add():void {
 const newrecord:Travel={...this.formgroup.value}
  this.service.add(newrecord).subscribe(()=>{
    this.loaddetails();
    this.resetform();
  })

}
add1(newrecord:Travel):void{
  this.service.add(newrecord).subscribe(()=>{
 this.loaddetails();
})
}
resetform():void{
  this.formgroup.reset();
  }
  updaterecord():void{
    const id=this.formgroup.value.id;
    const update:Travel={ ...this.formgroup.value};
    this.service.update(id,update).subscribe(()=>{
      this.loaddetails();
      this.resetform();
    })
  }
  updaterecord1(id:number,updaterecord:Travel){
    this.service.update(id,updaterecord).subscribe(()=>{
      this.loaddetails();
      this.resetform();

    })

    
  }
}
