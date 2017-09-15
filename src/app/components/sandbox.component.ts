import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../services/data.service'
@Component({
  selector: 'app-sandbox',
  templateUrl: './sandbox.component.html',
  styleUrls: ['./sandbox.component.css']
})
export class SandboxComponent implements OnInit {

  users:any[];
  user = {
    id: '',
    name: '',
    email: '',
    phone: ''
  }

  isEdit: boolean = false;

  constructor(public ServicesService:ServicesService) {

    this.ServicesService.getUsers().subscribe(users => {
        // console.log(users)
        this.users = users;
    });

   }

  ngOnInit() {
  }

  onSubmit(isEdit){
    if(isEdit){
      this.ServicesService.updateUser(this.user).subscribe(user =>{

          for(let i = 0 ; i < this.users.length; i++){
            if(this.users[i].id == this.user.id){
              this.users.splice(i,1);
            }
          }
          this.users.unshift(this.user);
      });

    }else{
      this.ServicesService.addUser(this.user).subscribe(user =>{
        console.log(user);

        this.users.unshift(user);
      });
    }


  }

  onDeleteClick(id){
    // console.log(id);
    this.ServicesService.deleteUser(id).subscribe(res => {
      // console.log(res)
      for(let i = 0 ; i < this.users.length; i++){
        if(this.users[i].id == id){
          this.users.splice(i,1);
        }
      }

    });
  }

  onEditClick(user){
    this.isEdit = true;
    this.user = user;
  }

}

















//
