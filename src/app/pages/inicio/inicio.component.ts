import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { FormsService } from '../services/forms.service';
import { environment } from '../../../environments/environment';
import swal from 'sweetalert2';

const $ = (window as any)['jQuery'];

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  // Para el dropdown en moviles que se comporta muy extraño por la clase de bootstrap
  flag = true;

  // Formulario de Contacto
  contactForm: any;
    nombre: string;
    email: string;
    asunto: string;
    mensaje: string;
    recaptcha: string;

    // Este es el siteKey del Google Captcha
   siteKey = environment.siteKey;

  /*
  // Formulario de solicitud de analisis Home
  tacticaForm: any;
    nombreHome: string;
    apellidoHome: string;
    emailHome: string;
    empresaHome: string;
    telefonoHome: string;
    seleccionHome: string;
    id = 'tactica';

    seleccion = ''; // Esta es la opción por default del input SELECT

    solucionesOptions = [
      {label: 'Selecciona una opción...', value: ''},
      {label: 'SAP Business One', value: 'SAP'},
      {label: 'Analítica de Datos BI', value: 'BI'}
    ];
*/
  constructor(private formBuilder: FormBuilder, private formService: FormsService) {
    this.contactForm = this.formBuilder.group({
      nombre: new FormControl(this.nombre, Validators.required ),
      email: new FormControl(this.email, [Validators.required, Validators.email]),
      asunto: new FormControl(this.asunto, Validators.required),
      mensaje: new FormControl(this.mensaje, Validators.required),
      recaptcha: new FormControl(this.recaptcha, Validators.required)
    });

/*
    this.tacticaForm = this.formBuilder.group({
      nombre: new FormControl(this.nombreHome, Validators.required),
      apellido: new FormControl(this.apellidoHome, Validators.required),
      email: new FormControl(this.emailHome, [Validators.required, Validators.email]),
      empresa: new FormControl(this.empresaHome, Validators.required),
      telefono: new FormControl(this.telefonoHome, Validators.required),
      solucion: new FormControl(this.seleccionHome, Validators.required)
    });
*/
  }

  /*
  // Resetea el formulario
  reset() {
    this.tacticaForm.reset();
  }
*/

/*
  tacticaSubmit(contactData: any) {
    this.formService.sendSolicitudTacticaTI(contactData.nombre, contactData.apellido, contactData.email, 
            contactData.empresa, contactData.telefono, contactData.solucion, this.id)
      .subscribe(() => {
        swal.fire(`Gracias ${ contactData.nombre } ${ contactData.apellido }`,
        'Tu solicitud ha sido recibida, en breve nos pondremos en contacto contigo',
        'success').finally(() => {
          this.tacticaForm.reset();
          this.triggerCloseModal();
        });
      });
  }

   triggerCloseModal() {
    $( '#close' ).trigger( 'click' );
  }

*/

resolved( response: any ) {
  this.recaptcha = response;
}

  contactSubmit(contactData: any) {

      this.formService.sendContactForm(contactData.nombre, contactData.email, contactData.asunto,
                                        contactData.mensaje, contactData.recaptcha)
        .subscribe(() => {
          swal.fire(`Gracias ${ contactData.nombre }`,
        'Tu solicitud ha sido recibida, en breve nos pondremos en contacto contigo',
        'success').finally(this.contactForm.reset());
        });

  }

  // Abre el menu soluciones en moviles
  /*
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
  */

  // Este evita que se abra el menu cuando le das en móviles
  // esta funcion se llama en cada click de las opciones y en el boton toggler para cerrar el menu
/*
  close() {
    this.flag = true;
    $('#dropdown-menu-id').hide();
    $('#icon').removeClass('fa-minus-circle').addClass('fa-plus-circle');
  }
*/

  ngOnInit() {

    // Este codigo es para animar los anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
          e.preventDefault();

          document.querySelector(this.getAttribute('href')).scrollIntoView({
              behavior: 'smooth'
          });
        });
      });


    $('.carrusel').owlCarousel({
        loop: true,
        margin: 0,
        nav: true,
        autoplay: true,
        autoplayTimeout: 2500,
        items: 4,
        navText: ['<i class="zmdi zmdi-chevron-left"></i>', '<i class="zmdi zmdi-chevron-right"></i>' ],
        dots: false,
        lazyLoad: true,
        responsive: {
            0: {
              items: 1,
            },
            576: {
              items: 2,
            },
            768: {
              items: 3
            },
            992: {
              items: 3
            },
            1920: {
              items: 4
            }
        },
      });

/*
      // Trigger hover
    $('.contenedor-lista .dropdown').on({
        mouseenter: () => {
          $('#dropdown-menu-id').fadeIn();
        },
        mouseleave: () => {
          $('#dropdown-menu-id').fadeOut();
        }
      });
*/
    // Aquí es donde se controla el sticky menu al hacer scroll
/*
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
*/

// When the user clicks on the button, open the modal
    $('#myBtn').click(() => {
        $('.modal-test').show('slow');
      });

// When the user clicks on <span> (x), close the modal
    $('span').click(() => {
        $('.modal-test').hide('slow');
      });
  }

}
