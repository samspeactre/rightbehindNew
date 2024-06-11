import { Directive, Input, HostListener, Self } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appCharacterLimit]',
})
export class CharacterLimitDirective {
  @Input() limit: number = 10;

  constructor(@Self() private ngControl: NgControl) {}

  @HostListener('input', ['$event'])
  onInput(event: any): void {
    const inputText: string = event.target.value;

    if (inputText.length > this.limit) {
      this.ngControl.control.setValue(inputText.substring(0, this.limit));
    }
  }
}
