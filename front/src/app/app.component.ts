import { Component, OnInit } from '@angular/core';
import {SocketService} from "./core/socket.service";
import {Command} from "../../../contract/Command";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  constructor(private socketService: SocketService) { }

  title = 'front';

  ngOnInit() {
    this.title = 'Looool'
    const command: Command = {
      type: 'command'
      name: 'merchant.account.create',
      payload: { name: 'Bobby', lastname: 'Firmino' }
    }
    this.socketService.sendCommand(command)
  }
}
