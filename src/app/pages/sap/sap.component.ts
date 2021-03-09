import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { FormsService } from '../services/forms.service';
import { RssService } from '../services/rss.service';
import { environment } from '../../../environments/environment';
import swal from 'sweetalert2';


const $ = (window as any).jQuery;

@Component({
  selector: 'app-sap',
  templateUrl: './sap.component.html',
  styleUrls: ['./sap.component.css']
})
export class SapComponent implements OnInit {



  constructor(private formBuilder: FormBuilder, private solicitudService: FormsService, private rss: RssService) {

    this.sapForm = this.formBuilder.group({
      nombre: new FormControl(this.nombreSAP, Validators.required),
      apellido: new FormControl(this.apellidoSAP, Validators.required),
      email: new FormControl(this.emailSAP, [Validators.required, Validators.email]),
      empresa: new FormControl(this.empresaSAP, Validators.required),
      telefono: new FormControl(this.telefonoSAP, Validators.required),
      recaptcha: new FormControl(this.recaptchaSAP, Validators.required)
    });

   }

    sapPosts = [];
    categoria = 'Sap Business One';

   // Para el dropdown en moviles que se comporta muy extraño por la clase de bootstrap
   flag = true;

    // Formulario de solicitud de demo SAP
    sapForm: any;
      nombreSAP: string;
      apellidoSAP: string;
      emailSAP: string;
      empresaSAP: string;
      telefonoSAP: string;
      recaptchaSAP: string;
      id = 'sap';

  modalElement: any = [];

     // Este es el siteKey del Google Captcha
     siteKey = environment.siteKey;

  modals = [
    {
      id: 'modal-icon-1',
      title: 'Gestión Financiera',
      funcionalidades: [
        {
          funcion: 'Contabilidad',
          // tslint:disable-next-line: max-line-length
          descripcion: 'gestiona automáticamente todos los procesos contables, como las entradas en el diario en la contabilidad de proveedores y clientes.'
        },
        {
          funcion: 'Controlling',
          // tslint:disable-next-line: max-line-length
          descripcion: 'gestiona con mayor precisión su flujo de caja, controla los presupuestos y supervisa los costos de los proyectos y centros de costos.'
        },
        {
          funcion: 'Simplificación',
          // tslint:disable-next-line: max-line-length
          descripcion: 'Evita la introducción manual de datos repetitivos, como por ejemplo en los activos fijos.'
        },
        {
          funcion: 'Gestión de bancos y conciliación',
          // tslint:disable-next-line: max-line-length
          descripcion: 'Procesa rápidamente las conciliaciones, los extractos bancarios y los pagos mediante diferentes métodos, incluidos los cheques, el efectivo y las transferencias bancarias.'
        },
        {
          funcion: 'Análisis e informes financieros',
          // tslint:disable-next-line: max-line-length
          descripcion: 'Genera informes estándar o personalizados a partir de datos en tiempo real para realizar la planificación empresarial y la revisión de auditorías.'
        }
      ],
    },
    {
      id: 'modal-icon-2',
      title: 'Gestión de Ventas y Clientes',
      funcionalidades: [
        {
          funcion: 'Gestion de Ventas y Oportunidades',
          // tslint:disable-next-line: max-line-length
          descripcion: 'realiza un seguimiento de sus actividades y oportunidades desde el primer contacto hasta el cierre del acuerdo a través del CRM.'
        },
        {
          funcion: 'Gestion de Servicio pos-venta',
          // tslint:disable-next-line: max-line-length
          descripcion: 'gestiona los contratos de servicio y garantías de forma eficiente, registra y responde rápidamente a las llamadas de servicio.'
        },
        {
          funcion: 'Generación de informes y análisis',
          // tslint:disable-next-line: max-line-length
          descripcion: 'ejecuta informes detallados en todas las áreas del proceso de ventas, incluida la previsión de ventas y el seguimiento de pipelines, mediante el uso de distintas plantillas que te permitirán ahorrar tiempo.'
        },
        {
          funcion: 'Movilice a su equipo de ventas',
          // tslint:disable-next-line: max-line-length
          descripcion: 'gestiona tu información de ventas desde cualquier lugar gracias a la aplicación móvil.'
        }
      ],
    },
    {
      id: 'modal-icon-3',
      title: 'Control de Compras e Inventario',
      funcionalidades: [
        {
          funcion: 'Aprovisionamiento',
          // tslint:disable-next-line: max-line-length
          descripcion: 'crea solicitudes de pedido, pedidos de compra y entradas de mercancías; gestiona las devoluciones, los gastos adicionales y las diferentes divisas.'
        },
        {
          funcion: 'Gestión de Datos Maestros',
          // tslint:disable-next-line: max-line-length
          descripcion: 'gestiona datos detallados, visualice el saldo de las cuentas y realiza un mantenimiento de la información detallada de adquisición de artículos, junto con una lista de precios e información fiscal.'
        },
        {
          funcion: 'Integración de Cuentas y Almacén',
          // tslint:disable-next-line: max-line-length
          descripcion: 'obtén una sincronización en tiempo real de tu nivel inventario en el almacén, así como la posibilidad de control por máximos, mínimos y/o prónosticos.'
        },
        {
          funcion: 'Procesa las facturas de proveedores, cancelaciones y notas de crédito mediante una referencia de pedido',
          // tslint:disable-next-line: max-line-length
          descripcion: 'planifica las necesidad de materiales (MRP) y programa sus compras en consecuencia.'
        },
        {
          funcion: 'Generación de informes más sencilla y actualizada',
          // tslint:disable-next-line: max-line-length
          descripcion: 'genera informes basados en datos en tiempo real y visualízalos en distintos formatos.'
        }
      ],
    },
    {
      id: 'modal-icon-4',
      title: 'Análisis y Generación de Informes',
      funcionalidades: [
        {
          funcion: 'Creación y personalización de informes',
          // tslint:disable-next-line: max-line-length
          descripcion: 'accede a los datos desde diferentes fuentes, crea informes nuevos y personaliza otros ya existentes mediante distintos diseños con la herramienta nativa Crystal Reports.'
        },
        {
          funcion: 'Análisis interactivos',
          // tslint:disable-next-line: max-line-length
          descripcion: 'utiliza las funcionalidades de MS Excel para generar informes y tener una vista del negocio desde nuevos ángulos.'
        },
        {
          funcion: 'Herramientas intuitivas',
          // tslint:disable-next-line: max-line-length
          descripcion: ' opciones de arrastrar y vincular, desgloses, asistencia para búsquedas y alertas basadas en flujos de trabajo.'
        },
        {
          funcion: 'Análisis e indicadores',
          // tslint:disable-next-line: max-line-length
          descripcion: 'rendimiento y clave (KPI) predefinidos que ayudarán a visualizar el promedio de días de desviación de las entregas y los cinco empleados de ventas con mejores resultados.'
        }
      ],
    },
    {
      id: 'modal-icon-5',
      title: 'Administración de Proyectos y Recursos',
      funcionalidades: [
        {
          funcion: 'Control financiero y de recursos',
          // tslint:disable-next-line: max-line-length
          descripcion: 'mide los costos planeados contra los reales para planear mejor el presupuesto para futuros proyectos.'
        },
        {
          funcion: 'Administración por etapas y tareas',
          // tslint:disable-next-line: max-line-length
          descripcion: 'monitorea el avance de etapas y tareas así como la posible gestión de subproyectos ya sea internos o externos.'
        },
        {
          funcion: 'Gráfico de gantt',
          // tslint:disable-next-line: max-line-length
          descripcion: 'visualiza la distribución de todas las etapas y su reparto en el tiempo.'
        },
        {
          funcion: 'Facturación asociada',
          // tslint:disable-next-line: max-line-length
          descripcion: 'genera facturas de clientes pendientes desde el asistente de generación.'
        },
        {
          funcion: 'Informes de proyectos',
          // tslint:disable-next-line: max-line-length
          descripcion: 'visualiza el estatus global de los proyectos activos y los pendientes de cada uno para su atención oportuna.'
        }
      ],
    },
    {
      id: 'modal-icon-6',
      title: 'Gestión del Sistema',
      funcionalidades: [
        {
          funcion: 'Administración de catálogos',
          // tslint:disable-next-line: max-line-length
          descripcion: 'crea y da mantenimiento a los diferentes catálogos que sirven como base para operar la solución.'
        },
        {
          funcion: 'Seguridad de información',
          // tslint:disable-next-line: max-line-length
          descripcion: 'parametriza las autorizaciones por módulo por perfil de usuario, determina las contraseñas así como sus vencimientos y controla los accesos por medio del Directorio Activo.'
        },
        {
          funcion: 'Respaldo de base de datos',
          // tslint:disable-next-line: max-line-length
          descripcion: 'asegura la integridad de la información, monitorea la estructura de la base de datos y configura respaldos automáticos con cierta programación.'
        },
        {
          funcion: 'Actualizaciones al alcance de TI',
          // tslint:disable-next-line: max-line-length
          descripcion: 'ejecuta e instala las versiones disponibles de la solución a través de un sencillo asistente.'
        }
      ],
    },
    {
      id: 'modal-icon-7',
      title: 'Planificación de la Producción y MRP',
      funcionalidades: [
        {
          funcion: 'Gestión de almacenes e inventario',
          // tslint:disable-next-line: max-line-length
          descripcion: 'gestione su inventario costeado, mantenga los datos maestros de los artículos, y utilice diferentes unidades de medida y determinación de precios.'
        },
        {
          funcion: 'Gestión de ubicaciones',
          // tslint:disable-next-line: max-line-length
          descripcion: 'gestiona tu stock en diferentes almacenes dividiéndolos en diferentes subzonas; establece normas de asignación, optimiza el movimiento de stock y reduce la duración del picking.'
        },
        {
          funcion: 'Control de entrada y salida de mercancías',
          // tslint:disable-next-line: max-line-length
          descripcion: 'registra la entrada y salida de mercancías; realiza un seguimiento de las ubicaciones y las transferencias del stock; permite la consignación, la entrega directa y otro tipo de pedidos; y realiza inventarios estándar y cíclicos.'
        },
        {
          funcion: 'Producción y planificación de necesidades de materia',
          // tslint:disable-next-line: max-line-length
          descripcion: 'crea y lleva a cabo un mantenimiento de las listas de materiales (BOM) multinivel, emite y libera las órdenes de producción de forma manual o mediante una toma retroactiva y actualiza los precios de las listas de materiales.'
        },
        {
          funcion: 'Generación de informes eficiente',
          // tslint:disable-next-line: max-line-length
          descripcion: 'genera informes basados en datos actualizados y visualízalos en distintos formatos.'
        }
      ],
    },
    {
      id: 'modal-icon-8',
      title: 'Funcionalidades Adicionales',
      funcionalidades: [
        {
          funcion: 'Integración de soluciones por industria como puntos de venta',
          // tslint:disable-next-line: max-line-length
          descripcion: 'comercio electrónico (B2B y B2C), manufactura avanzada, sistema de gestión de almacenes (WMS), sistema de administración de transporte (TMS), cálculo de nómina, entre otros.'
        }
      ],
    }

  ];

  reset() {
    this.sapForm.reset();
  }

  resolved( response: any) {
    this.recaptchaSAP = response;
  }

  demoSubmit(dataForm: any) {

    this.solicitudService
      .sendSolicitudSAP( dataForm.nombre, dataForm.apellido, dataForm.email, dataForm.empresa, 
                          dataForm.telefono, dataForm.recaptcha, this.id)
      .subscribe(() => {
        swal.fire(`Gracias ${ dataForm.nombre } ${ dataForm.apellido }`,
        'Tu solicitud ha sido recibida, en breve nos pondremos en contacto contigo',
        'success').finally( () => {
          this.sapForm.reset();
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
    // Nos traemos las últimas noticias de SAP
      this.rss.getSAPPosts().subscribe( rss => {
        this.rss.parseXML( rss, this.categoria ).then( (posts: any[]) => {
          if (posts.length > 0) {
            // console.log(posts);
            this.sapPosts = posts;

            // Cargamos el carrusel dentro de la ejecución de la promesa
            setTimeout(() => {
              $('.post-carrusel-sap').owlCarousel({
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

      $('.carrusel').owlCarousel({
      animateOut: 'zoomOut',
      animateIn: 'zoomInDown',
      loop: true,
      margin: 0,
      nav: true,
      autoplay: true,
      autoplayTimeout: 5000,
      items: 4,
      navText: ['<i class="zmdi zmdi-chevron-left"></i>', '<i class="zmdi zmdi-chevron-right"></i>' ],
      dots: false,
      lazyLoad: true,
      responsive: {
          0: {
            items: 1
          },
          576: {
            items: 1
          },
          768: {
            items: 1
          },
          992: {
            items: 1
          },
          1920: {
            items: 1
          }
      },
    });

  }

}
