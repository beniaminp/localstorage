import {Component} from '@angular/core';
import {LocalStorageService} from 'angular-2-local-storage';
import {Product} from './classes/product';
import {List} from './classes/list';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ls-app';
  private arrayList: List[] = [];
  private listId: number;
  private foundList: List;
  private stringnifyList: string;

  constructor(private ls: LocalStorageService) {
    this.generateListRandom();
  }

  private addListToLS() {
    this.ls.set('list', this.arrayList);
  }

  private findList() {
    let arrayListFromLS: List[] = this.ls.get('list');
    this.foundList = arrayListFromLS.find((list) => list.id == this.listId);
    this.stringnifyList = JSON.stringify(this.foundList);
  }

  private generateListRandom() {
    let list: List = new List();
    list.id = 1;
    list.name = 'Lista 1';
    list.products = [];

    for (let i = 2; i < 50; ++i) {
      let produs: Product = new Product();
      produs.id = i;
      produs.name = 'produs ' + i;
      produs.price = i + i * 2;

      list.products.push(produs);

      if (i % 2) {
        this.arrayList.push(list);
        list = new List();
        list.id = i;
        list.name = 'Lista ' + i;
        list.products = [];
      }
    }
  }
}
