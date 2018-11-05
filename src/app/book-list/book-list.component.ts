import { Component, OnInit, } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})

export class BookListComponent implements OnInit {
  editMode = false;
  inputAuthor = 'Author';
  inputTitle = 'Title';
  inputPublisher = 'Publisher';
  inputYear = 0;
  inputPages = 0;
  newID = 1;
  books = [];
  constructor(private modalService: NgbModal) { }

  ngOnInit() {
    this.loadFromLocalStorage();
    this.setNewID();
  }

  setNewID() {
    if (this.books.length > 0) {
      this.newID = this.books[this.books.length - 1].id + 1;
    } else {
      this.newID = 1;
    }
  }

  open(modal) {
    this.modalService.open(modal, { windowClass: 'container fade modal-large', size: 'lg' });
  }

  addEntry() {
    if (this.newID > 0 && this.newID < this.books.length) {
      this.books[this.newID] = {
        'id': this.books[this.newID].id,
        'title': this.inputTitle,
        'author': this.inputAuthor,
        'publisher': this.inputPublisher,
        'year': this.inputYear,
        'pages': this.inputPages
      };
    } else {
      this.books.push({
        'id': this.newID++,
        'title': this.inputTitle,
        'author': this.inputAuthor,
        'publisher': this.inputPublisher,
        'year': this.inputYear,
        'pages': this.inputPages
      });
    }
    this.setNewID();
    this.saveToLocalStorage();
    this.saveToLocalStorage();
    this.modalService.dismissAll();
  }

  deleteAll() {
    if (confirm('Wirklich alle Einträge löschen?')) {
      this.books = [];
    }
    this.saveToLocalStorage();
  }

  deleteEntry(i) {
    if (confirm('Wirklich Löschen?')) {
      this.books.splice(i, 1);
    }
    this.saveToLocalStorage();
  }

  editEntry(modal, i) {
    this.newID = this.books[i].author;
    this.inputAuthor = this.books[i].author;
    this.inputPages = this.books[i].pages;
    this.inputPublisher = this.books[i].publisher;
    this.inputTitle = this.books[i].title;
    this.inputYear = this.books[i].year;
    this.open(modal);
    this.newID = i;
  }

  private saveToLocalStorage() {
    localStorage['books'] = JSON.stringify(this.books);
  }

  private loadFromLocalStorage() {
    if (localStorage['books'] && localStorage['books'].trim() !== '') {
      this.books = JSON.parse(localStorage['books']);
    } else {
      this.resetBookList();
    }
  }

  private resetBookList() {
    this.books = [
      {
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
      }
    ];
    this.setNewID();
  }
}

