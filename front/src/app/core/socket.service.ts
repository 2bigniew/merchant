import {Injectable, OnInit} from '@angular/core';
import * as io from 'socket.io-client'
import {Command} from "../../../../contract/Command";

@Injectable({
  providedIn: 'root'
})
export class SocketService implements OnInit{
  private socket: io.Socket
  public data: any

  constructor() {
    this.socket = io.connect('http://127.0.0.1:4000')
  }

  public ngOnInit() {
    console.log('Socket connected')
  }

  public sendCommand(command: Command) {
    this.socket.emit('command', command)
  }
}
