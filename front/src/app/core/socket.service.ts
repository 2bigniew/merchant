import {Injectable, OnInit} from '@angular/core';
import * as io from 'socket.io-client'
import {COMMAND, Command, COMMANDS_TO_EVENTS} from "contract/Command";
import {EVENT} from "contract/Event";

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

  public sendCommand<T>(command: Command): Promise<T> {
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(reject, 5000)
      this.socket.on(EVENT, (data) => {
        console.log('EVENT DATA')
        console.log(data)
        clearTimeout(timeout)
        resolve(data)
      })

      const { success, failure } = COMMANDS_TO_EVENTS[command.name]
      console.log('COMMAND DATA')
      console.log(success, failure)

      this.socket.emit(COMMAND, command)
    })

  }
}
