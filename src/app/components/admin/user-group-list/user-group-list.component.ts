import { Component, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import { UserGroupService } from "src/app/services/userGroup.service";

@Component({
  selector: "user-group-list",
  templateUrl: "./user-group-list.component.html",
  styleUrls: ["./user-group-list.component.scss"]
})
export class UserGroupListComponent {
  userGroups: UserGroup[] = [];
  copyValue: string = "";

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private authService: AuthService,
    private userGroupService: UserGroupService
  ) {}

  async ngOnInit() {
    this.refreshUserGroups();
  }

  async refreshUserGroups() {
    this.userGroups = await this.userGroupService.getAllUserGroups();
  }

  async onRemoveValue(userGroupId: string, value: string) {
    try {
      await this.userGroupService.removeValue(userGroupId, value);
    } catch (err) {
      // TODO: show error message
      return;
    }

    // TODO: show success message
    this.refreshUserGroups(); 
  }

  async onAddUser(e: any, userGroup: UserGroup) {
    
  }

  async onCopyToClipboard(userGroup: UserGroup, inputEl: any) {

    this.copyValue = userGroup.values.join(';');
    inputEl.select();
    document.execCommand('copy');
    inputEl.setSelectionRange(0, 0);

    console.log(this.copyValue)
    console.log(userGroup);
    console.log(inputEl);

    debugger;
  }
}
