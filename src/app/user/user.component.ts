import { Component, Input } from '@angular/core';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  editUser: User | undefined; // the product currently being edited;
  constructor(private usersService: UserService) {}
  @Input() user: User | null = null;

  delete(): void {
    this.usersService
      .deleteUser(this.user!.id)
      .subscribe();
  }

  edit(id: number, name: string, username: string, password: string) {
    const newProduct: User = { id, name, username, password} as User;
    this.update(newProduct);
    this.editUser = undefined;
  }

  update(u : User) {
      this.usersService
        .updateUser(u)
        .subscribe((user: User) => {});
      this.editUser = undefined;
  }
}
