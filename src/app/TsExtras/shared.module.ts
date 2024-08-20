import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CharacterLimitDirective } from './character-limit.directive';
import { ScrollingModule } from '@angular/cdk/scrolling';

@NgModule({
  declarations: [CharacterLimitDirective],
  imports: [CommonModule, ScrollingModule],
  exports: [CharacterLimitDirective],
})
export class SharedModule {}
