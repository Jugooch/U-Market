import { Component, Input } from '@angular/core';
import { Product } from '../models/product.model';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {

  editProduct: Product | undefined; // the product currently being edited;
  constructor(private productsService: ProductService) {}

  @Input() product: Product | null = null;
  delete(): void {
    this.productsService
      .deleteProduct(this.product!.id)
      .subscribe();
  }

  edit(id: number, sellerid: number, title: string, price: number, quantity: number, description: string) {

    var image = "https://source.unsplash.com/random/200x200?"+title;
    const newProduct: Product = { id, sellerid, title,  price, quantity, description, image} as Product;
    this.update(newProduct);
    this.editProduct = undefined;
  }

  update(p : Product) {
      this.productsService
        .updateProduct(p)
        .subscribe((product: Product) => {});
      this.editProduct = undefined;
  }
}
