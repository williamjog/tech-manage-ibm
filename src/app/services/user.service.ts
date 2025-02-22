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

  addUser(user: User): void {
    this.users.push(user);
    this.usersSubject.next([...this.users]);
  }

  updateUser(updatedUser: User): void {
    const index = this.users.findIndex(user => user.id === updatedUser.id);
    if (index !== -1) {
      this.users[index] = { ...updatedUser };
      this.usersSubject.next([...this.users]);
    }
  }

  deleteUser(deletedUser: User): void {
    this.users = this.users.filter(user => user.id !== deletedUser.id);
    this.usersSubject.next([...this.users]);
  }

  generateId(): number {
    const maxId = this.users.length > 0 ? Math.max(...this.users.map(user => user.id)) : 0;
    return maxId + 1;
  }

}
