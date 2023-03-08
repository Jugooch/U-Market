import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent {
  products: Product[] = [];
  users: User[] = [];
  isProductsView: boolean = true;

  constructor(private productsService: ProductService, private usersService: UserService) {}

  search(searchTerm: string) {
    if(this.isProductsView){
      if (searchTerm) {
        this.productsService
          .searchProducts(searchTerm)
          .subscribe(products => (this.products = products));
      }
    }
    else{
      if (searchTerm) {
        this.usersService
          .searchUsers(searchTerm)
          .subscribe(users => (this.users = users));
      }
    }
  }

  setView(){
    if(this.isProductsView){
      this.isProductsView = false;
    }
    else{
      this.isProductsView = true;
    }
  }
}
