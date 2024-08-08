import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CharacterLimitDirective } from './character-limit.directive';

@NgModule({
  declarations: [CharacterLimitDirective],
  imports: [CommonModule],
  exports: [CharacterLimitDirective],
})
export class SharedModule {}
