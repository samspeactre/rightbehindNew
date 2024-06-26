import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharacterLimitDirective } from './character-limit.directive';



@NgModule({
  declarations: [CharacterLimitDirective],
  imports: [
    CommonModule
  ],
  exports:[
    CharacterLimitDirective
  ]
})
export class SharedModule { }
