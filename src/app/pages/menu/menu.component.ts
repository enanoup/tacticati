import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { FormsService } from '../services/forms.service';
import { environment } from '../../../environments/environment';
import swal from 'sweetalert2';

const $ = (window as any)['jQuery'];

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

   // Para el dropdown en moviles que se comporta muy extraño por la clase de bootstrap
  flag = true;

  tacticaForm: any;
    nombreHome: string;
    apellidoHome: string;
    emailHome: string;
    empresaHome: string;
    telefonoHome: string;
    seleccionHome: string;
    recaptchaHome: string;
    id = 'tactica';

    siteKey = environment.siteKey;

    seleccion = ''; // Esta es la opción por default del input SELECT

    solucionesOptions = [
      {label: 'Selecciona una opción...', value: ''},
      {label: 'SAP Business One', value: 'SAP'},
      {label: 'Analítica de Datos BI', value: 'BI'}
    ];

  constructor(private formBuilder: FormBuilder, private formService: FormsService) {
    this.tacticaForm = this.formBuilder.group({
      nombre: new FormControl(this.nombreHome, Validators.required),
      apellido: new FormControl(this.apellidoHome, Validators.required),
      email: new FormControl(this.emailHome, [Validators.required, Validators.email]),
      empresa: new FormControl(this.empresaHome, Validators.required),
      telefono: new FormControl(this.telefonoHome, Validators.required),
      solucion: new FormControl(this.seleccionHome, Validators.required),
      recaptcha: new FormControl(this.recaptchaHome, Validators.required)
    });
  }

    // Resetea el formulario
    reset() {
      this.tacticaForm.reset();
      this.seleccion = '';
    }

    triggerCloseModal() {
      $( '#close' ).trigger( 'click' );
    }

    resolved( response: any ) {
      this.recaptchaHome = response;
    }

    tacticaSubmit(contactData: any) {
      this.formService.sendSolicitudTacticaTI(contactData.nombre, contactData.apellido, contactData.email,
              contactData.empresa, contactData.telefono, contactData.solucion, contactData.recaptcha, this.id)
        .subscribe(() => {
          swal.fire(`Gracias ${ contactData.nombre } ${ contactData.apellido }`,
          'Tu solicitud ha sido recibida, en breve nos pondremos en contacto contigo',
          'success').finally(() => {
            this.tacticaForm.reset();
            this.triggerCloseModal();
          });
        });
    }

    // Abre el menu soluciones en moviles
    // Todo este desmother es porque se combina la funcionalidad de bootstrap
  open() {
    if ( $('#dropdown-menu-id').css('display') === 'none') {
      $('#dropdown-menu-id').slideDown();
      $('#icon').removeClass('fa-plus-circle').addClass('fa-minus-circle');
      this.flag = false;
      // console.log('entra display none');
    } else if ( $('#dropdown-menu-id').css('display') === 'block' && this.flag) {
      $('#dropdown-menu-id').slideDown();
      $('#icon').removeClass('fa-plus-circle').addClass('fa-minus-circle');
      this.flag = false;
      // console.log('entra con flag true y cambia a: ', this.flag);
    } else if ( $('#dropdown-menu-id').css('display') === 'block') {
      $('#dropdown-menu-id').slideUp();
      $('#icon').removeClass('fa-minus-circle').addClass('fa-plus-circle');
      // console.log('entra con display block');
    }
  }

  // Este evita que se abra el menu cuando le das en móviles
  // esta funcion se llama en cada click de las opciones y en el boton toggler para cerrar el menu
  close() {
    this.flag = true;
    $('#dropdown-menu-id').hide();
    $('#icon').removeClass('fa-minus-circle').addClass('fa-plus-circle');
  }

  ngOnInit() {


      // Trigger hover
      $('.contenedor-lista .dropdown').on({
        mouseenter: () => {
          $('#dropdown-menu-id').fadeIn();
        },
        mouseleave: () => {
          $('#dropdown-menu-id').fadeOut();
        }
      });
    // Aquí es donde se controla el sticky menu al hacer scroll
      $(window).scroll(() => {
      if ($('#menu').offset().top > 250) {
          $('#menu').addClass('navegador-after animated fadeIn');
          $('#button-2').addClass('display');
          $('.navbar-brand').addClass('display-none');
          $('.image-after').css('display', 'block');
      } else {
          $('#menu').removeClass('navegador-after animated fadeIn');
          $('#button-2').removeClass('display');
          $('.navbar-brand').removeClass('display-none');
          $('.image-after').css('display', 'none');
      }
    });
  }

}
