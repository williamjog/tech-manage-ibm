import { BehaviorSubject, Observable } from 'rxjs';
import { User } from './../../interfaces/user.interface';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users: User[] = [];
  private usersSubject = new BehaviorSubject<User[]>(this.users);

  constructor() { }

  getUsers(): Observable<User[]> {
    return this.usersSubject.asObservable();
  }

  addUser(user: Omit<User, 'id'>): void {
    const newUser: User = { id: this.generateId(), ...user };
    this.users.push(newUser);
    this.usersSubject.next([...this.users]);
  }

  private generateId(): number {
    return this.users.length ? Math.max(...this.users.map(u => u.id)) + 1 : 1;
  }
}
