import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};
@Injectable({
  providedIn: 'root'
})
export class DbService {

  constructor(private http: HttpClient) { }
  getUsers(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/users');
  }
  getUserShipments(name) {
    return this.http.get<any>('http://localhost:3000/shipments/' + name + '/user');
  }
  getMaterials(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/materials');
  }
  getSingleMaterial(name): Observable<any> {
    return this.http.get<any>('http://localhost:3000/singlematerial/' + name);
  }
  getSingleMaterialId(id): Observable<any> {
    return this.http.get<any>('http://localhost:3000/singlemateriaid/' + id);
  }
  getFormulaShipment(name): Observable<any> {
    return this.http.get<any>('http://localhost:3000/shipments/' + name + '/formula');
  }
  getPurchasesDate(date): Observable<any> {
    return this.http.get<any>('http://localhost:3000/purchasesdate/' + date);
  }
  getFormulas(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/formulas');
  }
  getSingleFormula(name): Observable<any> {
    return this.http.get<any>('http://localhost:3000/singleformula/' + name);
  }
  getContentMaterial(id): Observable<any> {
    return this.http.get<any>('http://localhost:3000/contents/' + id + '/material');
  }
  getPurchases(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/purchases');
  }
  getShipments(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/shipments');
  }
  getShipmentsDate(date): Observable<any> {
    return this.http.get<any>('http://localhost:3000/shipmentsdate/' + date);
  }
  getContents(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/contents');
  }
  getPurchaseRow(id) {
    return this.http.get<Object>('http://localhost:3000/purchases/' + id);
  }
  deleteUsers(id) {
    return this.http.delete('http://localhost:3000/purchases/' + id);
  }
  deletePurchases(id) {
    return this.http.delete('http://localhost:3000/purchases/' + id);
  }
  createPurchases(newData) {
    return this.http.post('http://localhost:3000/purchases', newData);

// newPurchase.Id, newPurchase.userId, newPurchase.materialId, newPurchase.counts, newPurchase.total, newPurchase.purchaseDate
  }
  createShipment(newData) {
    return this.http.post('http://localhost:3000/shipments', newData);

// newPurchase.Id, newPurchase.userId, newPurchase.materialId, newPurchase.counts, newPurchase.total, newPurchase.purchaseDate
  }
  createFormula(newData) {
    return this.http.post('http://localhost:3000/formulas', newData);

// newPurchase.Id, newPurchase.userId, newPurchase.materialId, newPurchase.counts, newPurchase.total, newPurchase.purchaseDate
  }
  createMaterial(newData) {
    return this.http.post('http://localhost:3000/materials', newData);
  }
  createContent(newData) {
    return this.http.post('http://localhost:3000/contents', newData);

// newPurchase.Id, newPurchase.userId, newPurchase.materialId, newPurchase.counts, newPurchase.total, newPurchase.purchaseDate
  }
  filterUsers(filterValue) {
    return this.http.get('http://localhost:3000/purchases/' + filterValue);

  }
  upDateFormula(data) {
    return this.http.post('http://localhost:3000/updateformula', data);
  }
  upDateContent(data) {
    return this.http.post('http://localhost:3000/updatecontent', data);
  }
  updateSingleMaterial(data) {
    return this.http.post('http://localhost:3000/updatesinglematerial', data);
  }
  deleteMaterial(id) {
    return this.http.delete('http://localhost:3000/materials/' + id);
  }
  deleteFormula(id) {
    return this.http.delete('http://localhost:3000/formulas/' + id);
  }
  deleteContent(id) {
    return this.http.delete('http://localhost:3000/contents/' + id);
  }
  deleteshipment(id) {
    return this.http.delete('http://localhost:3000/shipments/' + id);
  }
  // getUser(userId) {
  //   return this.http.get('https://jsonplaceholder.typicode.com/users/'+userId)
  // }
  //
  // getPosts() {
  //   return this.http.get('https://jsonplaceholder.typicode.com/posts')
  // }
}
