import { Component } from '@angular/core';

@Component({
	selector: 'app-booklist',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	inputAuthor = 'Author';
	inputTitle = 'Title';
	inputPublisher = 'Publisher';
	inputYear = 0;
	inputPages = 0;
	books = [
		{
			"id": 1,
			"title": "Mein Buch",
			"author": "Nils Geschwinde",
			"publisher": "Elster Verlag",
			"year": 2017,
			"pages": 205
		},
		{
			"id": 2,
			"title": "Mein Buch 2",
			"author": "Nils Geschwinde",
			"publisher": "Elster Verlag",
			"year": 2018,
			"pages": 185
		}];

	addEntry() {
		this.books.push(
			{
				"id": this.books[this.books.length - 1 ].id + 1,
				"title": this.inputTitle,
				"author": this.inputAuthor,
				"publisher": this.inputPublisher,
				"year": this.inputYear,
				"pages": this.inputPages

			});
	}

	deleteAll(){
		if(confirm('Wirklich alle Einträge löschen?')){
			this.books = [];
		}
	}

	deleteEntry(i) {
		if(confirm("Wirklich Löschen?")){
			this.books.splice(i, 1);
		}
	}

	editEntry(i) {

	}

	saveToLocalStorage() {

	}

	loadFormLocalStorage() {

	}
}
