import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FormsService {

  constructor( private http: HttpClient) { }

  sendSolicitudBI(nombre: string, apellido: string, email: string, empresa: string,
                  telefono: string, recaptcha: string, id: string): Observable<any> {
    return this.http.get(environment.urlServices + 'solicitud.php',
    { responseType: 'text', params: { nombre, apellido, email, empresa, telefono, recaptcha, id}} );
  }

  sendSolicitudSAP(nombre: string, apellido: string, email: string, empresa: string,
                   telefono: string, recaptcha: string, id: string): Observable<any> {
    return this.http.get(environment.urlServices + 'solicitud.php',
    { responseType: 'text', params: { nombre, apellido, email, empresa, telefono, recaptcha, id}} );
  }

  sendSolicitudTacticaTI(nombre: string, apellido: string, email: string, empresa: string,
                         telefono: string, solucion: string, recaptcha: string, id: string): Observable<any> {
    return this.http.get(environment.urlServices + 'solicitud.php',
      { responseType: 'text', params: { nombre, apellido, email, empresa, telefono, solucion, recaptcha, id}} );
  }

  sendContactForm(nombre: string, email: string, asunto: string, mensaje: string, recaptcha: string): Observable<any> {
    return this.http.get(environment.urlServices + 'contacto.php',
        { responseType: 'text', params: { nombre, email, asunto, mensaje, recaptcha}});
  }

}
