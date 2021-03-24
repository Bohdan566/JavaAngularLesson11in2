import {Component, Input, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {User} from '../../models/user';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private httpClient: HttpClient) { }
  users: User[];
  @Input()
  user: User = {id: null, name: '', username: '', email: ''};
  chosenUser: User;

  private url = 'http://localhost:8080/users';


  httpOptions = {};

  save(myForm: any): void {
    this.httpClient.post<User[]>(this.url + '/save', this.user)
      .subscribe(() => {
        this.httpClient.get<User[]>(this.url)
          .subscribe(value => this.users = value);
      });
  }

  goTo(user: User): void {
    console.log(user.id);
    this.httpClient.get(this.url + '/' + user.id).subscribe(value => this.chosenUser = value as User);
  }

  delete(user: User): void{
    this.httpClient.delete(this.url + '/' + user.id).subscribe(() => {
      this.httpClient.get<User[]>(this.url)
        .subscribe(value => this.users = value);
    });
  }

  ngOnInit(): void {
    this.httpClient.get<User[]>(this.url)
      .subscribe(value => this.users = value);
  }


  update(user: User): void {
    this.httpClient
      .post<User>(this.url + '/update' + user.id, user)
      .subscribe(() => {
        this.httpClient.get<User[]>(this.url)
          .subscribe(value => this.users = value);
      });
  }

}
