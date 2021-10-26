import { Component, OnInit } from '@angular/core';
import {AuthService} from "../core/auth.service";
import {Account} from "../../../../contract/Account";

@Component({
  selector: 'app-login-panel',
  templateUrl: './login-panel.component.html',
  styleUrls: ['./login-panel.component.scss']
})
export class LoginPanelComponent implements OnInit {
  accountList: Account[] = []
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    console.log(this.accountList)
    this.authService.getAccountList().subscribe(response => {
      this.accountList = response
      console.log(this.accountList)
    })
  }
}
