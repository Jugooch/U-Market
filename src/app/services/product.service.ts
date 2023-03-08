import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';


import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Product } from '../models/product.model';
import { HttpErrorHandler, HandleError } from '../http-error-handler.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};

@Injectable()
export class ProductService {
  productsUrl = 'http://localhost:8080/api/products';  // URL to web api
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('ProductsService');
  }

  /** GET products from the server */
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl)
      .pipe(
        catchError(this.handleError('getProducts', []))
      );
  }

    /** GET product by id */
  getProduct(id : number): Observable<any> {
    const params = new HttpParams();
    params.set("id", id);
    return this.http.get<any>(this.productsUrl, { params })
      .pipe(
        catchError(this.handleError('getProduct', []))
      );
  }

  /* GET products whose name contains search term */
  searchProducts(term: string): Observable<Product[]> {
    term = term.trim();

    // Add safe, URL encoded search parameter if there is a search term
    const options = term ?
     { params: new HttpParams().set('name', term) } : {};

    return this.http.get<Product[]>(this.productsUrl, options)
      .pipe(
        catchError(this.handleError<Product[]>('searchProducts', []))
      );
  }

  //////// Save methods //////////

  /** POST: add a new product to the database */
  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.productsUrl, product, httpOptions)
      .pipe(
        catchError(this.handleError('addProduct', product))
      );
  }

  /** DELETE: delete the product from the server */
  deleteProduct(id: number): Observable<unknown> {
    const url = `${this.productsUrl}/${id}`; // DELETE api/products/42
    return this.http.delete(url, httpOptions)
      .pipe(
        catchError(this.handleError('deleteProduct'))
      );
  }

  /** PUT: update the product on the server. Returns the updated product upon success. */
  updateProduct(product: Product): Observable<Product> {
    httpOptions.headers =
      httpOptions.headers.set('Authorization', 'my-new-auth-token');

    return this.http.put<Product>(this.productsUrl, product, httpOptions)
      .pipe(
        catchError(this.handleError('updateProduct', product))
      );
  }
}
