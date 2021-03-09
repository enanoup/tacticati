import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { FormsService } from '../services/forms.service';
import { RssService } from '../services/rss.service';

import { environment } from '../../../environments/environment';

import swal from 'sweetalert2';

const $ = (window as any).jQuery;


@Component({
  selector: 'app-analitica',
  templateUrl: './analitica.component.html',
  styleUrls: ['./analitica.component.css']
})
export class AnaliticaComponent implements OnInit {

constructor(private formBuilder: FormBuilder, private solicitudService: FormsService, private rss: RssService) {

this.analiticaForm = this.formBuilder.group({
  nombre: new FormControl(this.nombreAnalitica, Validators.required),
  apellido: new FormControl(this.apellidoAnalitica, Validators.required),
  email: new FormControl(this.emailAnalitica, [Validators.required, Validators.email]),
  empresa: new FormControl(this.empresaAnalitica, Validators.required),
  telefono: new FormControl(this.telefonoAnalitica, Validators.required),
  recaptcha: new FormControl(this.recaptchaAnalitica, Validators.required)
});

}

  biPosts = [];
  categoria = 'Business Intelligence';
  // Para el dropdown en moviles que se comporta muy extraño por la clase de bootstrap
  flag = true;

  // Formulario de solicitud de demo SAP
  analiticaForm: any;
    nombreAnalitica: string;
    apellidoAnalitica: string;
    emailAnalitica: string;
    empresaAnalitica: string;
    telefonoAnalitica: string;
    recaptchaAnalitica: string;
    id = 'bi';

   // Este es el siteKey del Google Captcha
   siteKey = environment.siteKey;

    modalElement: any = [];

  modals = [
  {
  id: 'modal-icon-1',
  title: 'Power BI',
  // tslint:disable-next-line: max-line-length
  descripcion: 'Solución de análisis empresarial que permite visualizar los datos y compartir información con toda la organización, o insertarla en su aplicación o sitio web.',
  funcionalidades: [
    {
      funcion: 'Crea',
      // tslint:disable-next-line: max-line-length
      descripcion: 'conecta con tus datos, estén donde estén. Después, explora con visualizaciones interactivas.'
    },
    {
      funcion: 'Colabora y comparte',
      // tslint:disable-next-line: max-line-length
      descripcion: 'publica informes y paneles, colabora con tu equipo y comparte información dentro y fuera de la organización.'
    },
    {
      funcion: 'Accede a la información desde cualquier lugar',
      // tslint:disable-next-line: max-line-length
      descripcion: 'Accede sin problemas a la información tanto en tu escritorio como fuera de la oficina con las aplicaciones de Power BI creadas por Microsoft, nuestros socios y tu organización.'
    }
  ],
},
{
  id: 'modal-icon-2',
  title: 'SAP Analytics Cloud',
  // tslint:disable-next-line: max-line-length
  descripcion: 'Analíticas aumentadas - revela información estratégica relevante, precisa y accionable más rápido con inteligencia artificial y tecnologías de machine learning',
  funcionalidades: [
    {
      funcion: 'Business Intelligence',
      // tslint:disable-next-line: max-line-length
      descripcion: 'explora los datos de toda la organización y obten información estratégica en el punto de decisión con analíticas de autoservicio intuitivas.'
    },
    {
      funcion: 'Planificación empresarial',
      // tslint:disable-next-line: max-line-length
      descripcion: 'vincula y crea planes financieros y operativos ágilmente en una única solución para impulsar mejores decisiones con planes integrados.'
    },
    {
      funcion: 'Diseño de aplicaciones analíticas',
      // tslint:disable-next-line: max-line-length
      descripcion: 'crea contenido analítico centralizado –desde analíticas guiadas hasta planificación sofisticada y aplicaciones inteligentes.'
    }
  ],
},
{
  id: 'modal-icon-3',
  title: 'Hana Analytics',
  descripcion: 'Con Business Intelligence integrado e interfaz Fiori ofrece:',
  funcionalidades: [
    {
      funcion: 'Tecnología in-memory',
      // tslint:disable-next-line: max-line-length
      descripcion: 'evalua y analiza todo los datos empresariales con rapidez, así como el stock, las compras y las ventas, los índices financieros, etc.'
    },
    {
      funcion: 'Tablero gráficos con visión general del negocio o del departamento',
      // tslint:disable-next-line: max-line-length
      descripcion: 'adopta decisiones en tiempo real con los cuadros de análisis de SAP Business One HANA te permitirán obtener en pocos segundos la información que necesitas.'
    },
    {
      funcion: 'KPIs y Dashboard',
      // tslint:disable-next-line: max-line-length
      descripcion: 'diseña tu propio dashboard o utiliza cualquiera de los más de 42 KPIs, incluyendo contabilidad, administración y presupuestos; y 21 dashboards prediseñados.'
    },
    {
      funcion: 'Gráficos',
      // tslint:disable-next-line: max-line-length
      descripcion: 'integra escenarios gráficos e interactivos que facilitan la proyección de flujo de efectivo o la predicción de demanda, así como la jerarquización gráfica para las fechas de entrega de un producto para diferentes clientes.'
    }
  ],
}

];

// Resetea el formulario
reset() {
  this.analiticaForm.reset();
}

resolved( response: any ) {
  this.recaptchaAnalitica = response;
}

demoSubmit(dataForm: any) {

  this.solicitudService
    .sendSolicitudBI( dataForm.nombre, dataForm.apellido, dataForm.email, dataForm.empresa, 
                    dataForm.telefono, dataForm.recaptcha, this.id)
    .subscribe(() => {
      swal.fire(`Gracias ${ dataForm.nombre } ${ dataForm.apellido }`,
                'Tu solicitud ha sido recibida, en breve nos pondremos en contacto contigo',
                'success').finally( () => {
                  this.analiticaForm.reset();
                  this.triggerCloseModal();
      });
    });

}

triggerCloseModal() {
  $( '#close' ).trigger( 'click' );
}
    // Abre el menu soluciones en moviles
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

openModal( modal: string ) {
$('.modal-content-funcion').removeClass('fadeOutUp').addClass('fadeInDown');
this.modalElement = $('#modal-' + modal);
this.modalElement.css('display', 'block');
}

closeModal() {
$('.modal-content-funcion').removeClass('fadeInDown').addClass('fadeOutUp');
setTimeout(() => {
    $('.modal-funcion').css('display', 'none');
  }, 200);
}

ngOnInit() {

   // Nos traemos las últimas noticias de BI
   this.rss.getBIPosts().subscribe( rss => {
    this.rss.parseXML( rss, this.categoria ).then( (posts: any[]) => {
      
      if (posts.length > 0) {
        // console.log(posts);
        this.biPosts = posts;

         // Cargamos el carrusel dentro de la ejecución de la promesa
        setTimeout(() => {
          $('.post-carrusel-bi').owlCarousel({
            loop: true,
            margin: 0,
            padding: 0,
            center: true,
            nav: true,
            autoplay: true,
            autoplayTimeout: 3500,
            items: 3,
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
                items: 2,
              },
              992: {
                items: 3,
              },
              1920: {
                items: 3,
              }
          },
        });
        }, 2000);


      }
    });
  });
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

 // Este codigo es para animar los anchor links
   document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();

    document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
    });
  });
});

// Este código cierra el modal si haces click en cuakquier parte
   $(window).click((e: any) => {
  if ( e.target === this.modalElement[0]) {
    this.closeModal();
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
