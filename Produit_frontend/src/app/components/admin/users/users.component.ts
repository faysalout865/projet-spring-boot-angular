import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService, User } from '../../../services/user.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  isModalOpen = false;
  isSubmitting = false;
  newUser: User = { username: '', password: '' };

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getAllUsers().subscribe(data => this.users = data);
  }

  openModal() {
    this.newUser = { username: '', password: '' };
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  saveUser() {
    if (!this.newUser.username || !this.newUser.password) return;
    this.isSubmitting = true;
    this.userService.createUser(this.newUser).subscribe({
      next: () => {
        this.loadUsers();
        this.closeModal();
      },
      error: () => this.isSubmitting = false
    });
  }

  deleteUser(id: number | undefined) {
    if (id && confirm('Delete this user?')) {
      this.userService.deleteUser(id).subscribe(() => this.loadUsers());
    }
  }
}
