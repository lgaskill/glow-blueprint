import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ApiService } from "./api.service";

@Injectable()
export class AuthService {
  constructor(private http: HttpClient, private apiService: ApiService) {}

  async login(username: string, password: string): Promise<User> {
    const response = await this.apiService.post<any>("/authenticate", {
      username: username,
      password: password
    });

    const { user } = response;
    if (!user || !user.token) {
      return null;
    }

    this.setCurrentUser(user);

    return user;
  }

  logout() {
    // remove user from local storage to log user out
    this.setCurrentUser(null);
  }

  getCurrentUser(): User {
    const storedUser: string = localStorage.getItem("currentUser");
    if (!storedUser) {
      return null;
    }
    return JSON.parse(storedUser);
  }

  setCurrentUser(user: User): void {
    if (!user) {
      localStorage.removeItem("currentUser");
    } else {
      localStorage.setItem("currentUser", JSON.stringify(user));
    }
  }
}
