import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Book } from './book';

export class InMemoryDataService implements InMemoryDbService {

  createDb() {
    const books = [{
      'id': 1,
      'title': 'Mein Buch',
      'author': 'Nils Geschwinde',
      'publisher': 'Elster Verlag',
      'year': 2017,
      'pages': 205
    },
    {
      'id': 2,
      'title': 'Mein Buch 2',
      'author': 'Nils Geschwinde',
      'publisher': 'Elster Verlag',
      'year': 2018,
      'pages': 185
    }];
    return {books};
   }

   genId(books: Book[]): number {
    return books.length > 0 ? Math.max(...books.map(hero => hero.id)) + 1 : 11;
  }
}
