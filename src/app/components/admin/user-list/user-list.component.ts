import { Component } from "@angular/core";
import { MatSnackBar } from "@angular/material";
import { UserService } from "src/app/services/user.service";
import { ApiService } from "src/app/services/api.service";

@Component({
  selector: "user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.scss"]
})
export class UserListComponent {
  users: User[] = [];
  healthHistoryLookup: { [key: string]: HealthHistory } = {};
  selectedUser: User = null;

  constructor(
    private snackBar: MatSnackBar,
    private userService: UserService,
    private apiService: ApiService
  ) {}

  async ngOnInit() {
    this.refreshUsers();
    this.refreshHealthHistories();
  }

  async refreshUsers() {
    try {
      this.users = await this.userService.getAllUsers();
    } catch (err) {
      return this.snackBar.open("Failed to load users", "", { duration: 5000 });
    }

    this.selectedUser = this.users[0];
  }

  async refreshHealthHistories() {
    let healthHistories: HealthHistory[];
    try {
      healthHistories = await this.apiService.get<HealthHistory[]>(
        "/health-histories"
      );
    } catch (err) {
      return this.snackBar.open("Failed to load users", "", { duration: 5000 });
    }

    if (!healthHistories || !healthHistories.length) {
      return;
    }

    // Populate lookup map
    healthHistories.forEach(hh => (this.healthHistoryLookup[hh.userId] = hh));
  }

  onSelectionChange(selectedUser: User) {
    this.selectedUser = selectedUser;
  }
}
