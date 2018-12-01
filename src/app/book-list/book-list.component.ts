import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Book } from '../book';
import { BookService } from '../book.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})

export class BookListComponent implements OnInit {
  inputAuthor = 'Author';
  inputTitle = 'Title';
  inputPublisher = 'Publisher';
  inputYear = 0;
  inputPages = 0;
  editMode = false;
  editBook: Book = null;
  books: Book[];
  constructor(private modalService: NgbModal, private bookService: BookService) { }

  ngOnInit() {
    this.getBooks();
  }

  open(modal) {
    this.editBook = null;
    this.modalService.open(modal, { windowClass: 'container fade modal-large', size: 'lg' });
  }

  addEntry() {
    this.bookService.addBook({
      title: this.inputTitle,
      author: this.inputAuthor, pages: this.inputPages,
      publisher: this.inputPublisher, year: this.inputYear
    } as Book)
      .subscribe(book => {
        this.books.push(book);
      });
    this.modalService.dismissAll();
  }

  deleteAll() {
    if (confirm('Wirklich alle Einträge löschen?')) {
      this.books = [];
    }
  }

  submitForm() {
    if (this.editBook) {
      this.updateBook(this.editBook.id);
    } else {
      this.addEntry();
    }
  }

  deleteBook(book: Book): void {
    this.books = this.books.filter(h => h !== book);
    this.bookService.delBook(book).subscribe();
  }

  editEntry(modal, book) {
    this.open(modal);
    this.editBook = book;
    this.inputAuthor = this.editBook.author;
    this.inputPages = this.editBook.pages;
    this.inputPublisher = this.editBook.publisher;
    this.inputTitle = this.editBook.title;
    this.inputYear = this.editBook.year;
  }

  updateBook(updateID: number): void {
    this.bookService.updateBook({
      id: updateID, title: this.inputTitle,
      author: this.inputAuthor, pages: this.inputPages,
      publisher: this.inputPublisher, year: this.inputYear
    } as Book)
      .subscribe();
    this.editBook = null;
    this.modalService.dismissAll();
  }

  getBooks(): void {
    this.bookService.getBooks().subscribe(books => this.books = books);
  }

}

