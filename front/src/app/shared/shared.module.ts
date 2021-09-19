import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Components
import { SidebarComponent } from './components/sidebar/sidebar.component';



@NgModule({
  declarations: [
    SidebarComponent
  ],
  exports: [
    SidebarComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class SharedModule { }
