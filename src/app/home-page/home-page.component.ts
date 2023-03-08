import { Component } from '@angular/core';
import { Product } from '../models/product.model';
import { User } from '../models/user.model';
import { ProductService } from '../services/product.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {

  products: Product[] = [];
  users: User[] = [];
  editProduct: Product | undefined; // the product currently being edited
  editUser: User | undefined; //user being updated
  productName = '';
  userName = '';

  constructor(private productsService: ProductService, private usersService: UserService) {}

  /*
  Intialize the lists of users and products
  */
  ngOnInit() {
    this.getProducts();
    this.getUsers();
  }

    /*
  gets the lists of users
  */
  getUsers(): void {
    this.usersService.getUsers()
      .subscribe(users => (this.users = users));
  }

    /*
  Intialize the lists of a users
  */
  getUser(): void {
    this.usersService.getUsers()
      .subscribe(users => (this.users = users));
  }

    /*
  add a users
  */
  addUser(id: number, name: string, username: string, password: string): void {
    this.editUser = undefined;

    // The server will generate the id for this new product
    const newUser: User = {id, name, username, password} as User;
    this.usersService
      .addUser(newUser)
      .subscribe(user => this.users.push(user));
  }

    /*
  update a users
  */
  updateUser(u : User) {
      this.usersService
        .updateUser(u)
        .subscribe((user: User) => {
        // replace the product in the products list with update from server
        const ix = user ? this.users.findIndex(h => h.id === user.id) : -1;
        if (ix > -1) {
          this.users[ix] = user;
        }
      });
      this.editUser = undefined;
  }

      /*
  gets the lists of products
  */
  getProducts(): void {
    this.productsService.getProducts()
      .subscribe(products => (this.products = products));
  }

      /*
  Intialize the lists of a product
  */
  getProduct(): void {
    this.productsService.getProducts()
      .subscribe(products => (this.products = products));
  }

/*
Add a product
*/
  add(id: number, sellerid: number, title: string, price: number, quantity: number, description: string): void {
    this.editProduct = undefined;

    var image = "https://source.unsplash.com/random/200x200?"+title;

    // The server will generate the id for this new product
    const newProduct: Product = {id, sellerid, title,  price, quantity, description, image} as Product;
    this.productsService
      .addProduct(newProduct)
      .subscribe(product => this.products.push(product));
  }

  /*
  Update a project
  */
  update(p : Product) {
      this.productsService
        .updateProduct(p)
        .subscribe((product: Product) => {
        // replace the product in the products list with update from server
        const ix = product ? this.products.findIndex(h => h.id === product.id) : -1;
        if (ix > -1) {
          this.products[ix] = product;
        }
      });
      this.editProduct = undefined;
  }
}
