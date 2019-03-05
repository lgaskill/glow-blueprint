import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";

@Injectable()
export class UserGroupService {
  constructor(private apiService: ApiService) {}

  async getAllUserGroups(): Promise<UserGroup[]> {
    return this.apiService.get<UserGroup[]>("/user_group");
  }

  async getUserGroupById(userGroupID: string): Promise<UserGroup> {
    return this.apiService.get<UserGroup>(`/user_group/${userGroupID}`);
  }

  async createUserGroup(userGroup: UserGroup): Promise<UserGroup> {
    return this.apiService.post<UserGroup>("/user_group", userGroup);
  }

  async updateUserGroup(patchObj: any): Promise<UserGroup> {
    return this.apiService.patch<UserGroup>("/user_group", patchObj);
  }

  async removeValue(userGroupId:string, value: string): Promise<any> {
    return this.apiService.put<any>(`/user_group/remove/${userGroupId}`, {value});
  }
}
