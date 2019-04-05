import { Injectable } from '@angular/core';
import { ToastyService } from 'ng2-toasty';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandleService {

  constructor(private toasty: ToastyService) { }

  handle(errorResponse: any) {
    let mensagem: string;

    if ( typeof errorResponse === 'string' ) {
      mensagem = errorResponse;
    } else {
      mensagem = 'Erro ao processar serviço remoto. Tente novamente.';
      console.log('Error', errorResponse);
    }

    this.toasty.error({
      title: 'Erro na operação.',
      msg: mensagem,
      showClose: true,
      timeout: 5000
    });

  }

}
