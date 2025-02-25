import { User } from 'src/interfaces/user.interface';
import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';


describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initially return an empty user list', (done) => {
    service.getUsers().subscribe(users => {
      expect(users).toEqual([]);
      done();
    });
  });

  it('should add a user and update the list', (done) => {
    const user: User = { 
      id: 1, 
      name: 'John Doe', 
      email: 'john.doe@example.com', 
      phone: '(51) 99275-1224', 
      birthDate: new Date('1990-01-01'),
      role: 'admin' 
    };
    service.addUser(user);

    service.getUsers().subscribe(users => {
      expect(users.length).toBe(1);
      expect(users[0]).toEqual(user);
      done();
    });
  });

  it('should update an existing user', (done) => {
    const user: User = { 
      id: 1, 
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '(51) 99212-2212',
      birthDate: new Date('1990-01-01'),
      role: 'admin' 
    };
    service.addUser(user);

    const updatedUser: User = { ...user, name: 'John Updated' };
    service.updateUser(updatedUser);

    service.getUsers().subscribe(users => {
      expect(users.length).toBe(1);
      expect(users[0].name).toBe('John Updated');
      done();
    });
  });

  it('should not update a non-existent user', (done) => {
    const user: User = { 
      id: 1, 
      name: 'Non Existent', 
      email: 'nonexistent@example.com', 
      phone: '(55) 99122-5512', 
      birthDate: new Date('1990-01-01'), 
      role: 'user' 
    };
    service.updateUser(user);

    service.getUsers().subscribe(users => {
      expect(users.length).toBe(0);
      done();
    });
  });

  it('should delete an existing user', (done) => {
    const user: User = { 
      id: 1, 
      name: 'John Doe', 
      email: 'john.doe@example.com', 
      phone: '(45) 99220-0051', 
      birthDate: new Date('1990-01-01'),
      role: 'admin' 
    };
    service.addUser(user);
    service.deleteUser(user);

    service.getUsers().subscribe(users => {
      expect(users.length).toBe(0);
      done();
    });
  });

  it('should not delete a non-existent user', (done) => {
    const user: User = { 
      id: 99, 
      name: 'Ghost User', 
      email: 'ghost@example.com', 
      phone: '(55) 92455-1209', 
      birthDate: new Date('2000-01-01'),
      role: 'user' 
    };
    service.deleteUser(user);

    service.getUsers().subscribe(users => {
      expect(users.length).toBe(0);
      done();
    });
  });

  it('should generate unique IDs', () => {
    const user1: User = { 
      id: service.generateId(), 
      name: 'User 1', 
      email: 'user1@example.com', 
      phone: '(31) 90012-1220', 
      birthDate: new Date('1980-01-01'),
      role: 'user' 
    };
    service.addUser(user1);

    const user2: User = { 
      id: service.generateId(), 
      name: 'User 2',
      email: 'user2@example.com', 
      phone: '(21) 91238-0012', 
      birthDate: new Date('1985-01-01'), 
      role: 'user' 
    };
    service.addUser(user2);

    expect(user1.id).not.toBe(user2.id);
    expect(user2.id).toBe(user1.id + 1);
  });

});