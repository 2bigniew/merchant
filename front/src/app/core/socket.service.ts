import {Injectable, OnInit} from '@angular/core';
import * as io from 'socket.io-client'
import {COMMAND, Command, CommandFailure, COMMANDS_TO_EVENTS, CommandsFailuresNames} from "contract/Command";
import {EVENT, EventsNames, Event} from "contract/Event";
import {Observable, from, Subscription} from "rxjs";
import {observeOn} from "rxjs/operators";

type SocketEvents = Record<EventsNames | CommandsFailuresNames, Event | CommandFailure>

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: io.Socket

  constructor() {
    this.socket = io.connect('http://127.0.0.1:4000')
  }

  public sendCommand(command: Command): Promise<Event | CommandFailure> {
    const { success, failure } = COMMANDS_TO_EVENTS[command.name]

    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        this.socket.off(EVENT)
        reject()
      }, 5000)

      this.socket.on(EVENT, (event: Event | CommandFailure) => {
        if (event.name === success) {
          clearTimeout(timeout)
          this.socket.off(EVENT)
          resolve(event)
        }

        if (event.name === failure) {
          clearTimeout(timeout)
          this.socket.off(EVENT)
          resolve(event)
        }
      })

      this.socket.emit(COMMAND, command)
    })

  }
}
