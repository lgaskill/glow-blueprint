import { Component } from "@angular/core";
import { MatSnackBar } from "@angular/material";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.scss"]
})
export class UserListComponent {
  users: User[] = [];
  selectedUser: User = null;

  constructor(
    private snackBar: MatSnackBar,
    private userService: UserService
  ) {}

  async ngOnInit() {
    this.refreshUsers();
  }

  async refreshUsers() {
    try {
      this.users = await this.userService.getAllUsers();
    } catch (err) {
      return this.snackBar.open("Failed to load users", "", { duration: 5000 });
    }

    this.selectedUser = this.users[0];
  }

  onSelectionChange(selectedUser: User) {
    this.selectedUser = selectedUser;
  }
}
