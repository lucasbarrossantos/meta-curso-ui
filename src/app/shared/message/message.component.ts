import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-message',
  template: `
  <div *ngIf="temErro()" class="ui-message ui-messages-error">
    <span class="ui-message-icon pi pi-times"></span>
    {{ text }}
  </div>
  `,
  styles: [ ` .ui-messages-error { margin: 0; margin-top: 2px; background-color: #ff00004a;} ` ]
})
export class MessageComponent {

  // @Input() Decorator de entrada de dados
  @Input() error: string;
  @Input() control: FormControl;
  @Input() text: string;

  // Se o campo foi alterado (mexido) e tem erro de required, então exibe
  temErro(): boolean {
    return this.control.hasError(this.error) && this.control.dirty; // required? minlength ...
  }

}
