import {NgModule, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthService} from "../core/auth.service";

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class AccountPanelModule implements OnInit{

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
  }
}
