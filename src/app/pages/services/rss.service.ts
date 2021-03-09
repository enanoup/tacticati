import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import xml2js from 'xml2js';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RssService {


  xmlItems: any;

  constructor(private http: HttpClient) { }

  getBIPosts() {
    return this.http.get(environment.rssFeed, {responseType: 'text'});
  }

  getSAPPosts(): Observable<any> {
    return this.getBIPosts();
  }

  parseXML(xml: any, categoria: string) {

    return new Promise(resolve => {
      let categoryPosts = [];
      // tslint:disable-next-line: one-variable-per-declaration
      const parser = new xml2js.Parser(
          {
            trim: true,
            explicitArray: true
          });
      parser.parseString(xml, (err, result) => {

          const truncate = (str, max, suffix) => str.length < max ? str : `${str.substr(0, str.substr(0, max - suffix.length).lastIndexOf(' '))}${suffix}`;
          const posts = [];
          categoryPosts = result.rss.channel[0].item;
  
          categoryPosts = categoryPosts.filter( (post: any) => post.category[0] === categoria);

          // Solo queremos los 5 últimos posts en el carrusel
          for (let i = 0; i < 5; i++) {
            // Verificamos si existe elemento enel indice del arreglo
            if (categoryPosts[i]) {

              // Con esto cortamos la descripcion sin hacerlo desde wordpress ya que al actualizarlo se borra
              categoryPosts[i].description[0] = truncate(categoryPosts[i].description[0], 150, '...');
              posts.push(categoryPosts[i]);
            } else {
              break;
            }
          }
          resolve(posts);
      });
    });
  }

}
