import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";

@Injectable()
export class UserService {
  constructor(private apiService: ApiService) {}

  async getAllUsers(): Promise<User[]> {
    return this.apiService.get<User[]>("/users");
  }

  async updateUser(patchObj: any): Promise<User> {
    return this.apiService.patch<User>("/user", patchObj);
  }
}
