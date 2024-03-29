import { Component, OnInit } from '@angular/core';
import {AuthService} from "../core/auth.service";
import {Account} from "../../../../contract/Account";
import {SocketService} from "../core/socket.service";
import {COMMAND, Command} from "../../../../contract/Command";

@Component({
  selector: 'app-login-panel',
  templateUrl: './login-panel.component.html',
  styleUrls: ['./login-panel.component.scss']
})
export class LoginPanelComponent implements OnInit {
  accountList: Account[] = []

  constructor(private authService: AuthService, private socketService: SocketService) { }

  ngOnInit(): void {
    console.log(this.accountList)
    this.authService.getAccountList().subscribe(response => {
      this.accountList = response
      console.log(this.accountList)
    })
  }

  public async createAccount (): Promise<void> {
    const  commandData: Command = {
      type: COMMAND,
      name: 'command.account.create',
      payload: {
        firstname: 'Zbigniew',
        lastname: 'Stasiak',
        password: 'zbyniu',
        email: `stasiakzb${new Date().getTime()}@gmail.com`
      }
    }
    const promise = await this.socketService.sendCommand(commandData)
    console.log('promise')
    console.log(promise)
  }
}
