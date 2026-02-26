import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produit } from '../models/produit';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  // GET: Bach tjib ga3 les produits
  getAllProduits(): Observable<Produit[]> {
    return this.http.get<Produit[]>(`${this.apiUrl}/all`);
  }

  // GET: Bach tjib produit wa7d
  getProduit(id: number): Observable<Produit> {
    return this.http.get<Produit>(`${this.apiUrl}/${id}`);
  }

  // POST: Bach t-zid produit jdid
  saveProduit(produit: Produit): Observable<Produit> {
    return this.http.post<Produit>(this.apiUrl, produit);
  }

  // PUT: Bach t-modifier produit
  updateProduit(produit: Produit): Observable<Produit> {
    return this.http.put<Produit>(this.apiUrl, produit);
  }

  // DELETE: Bach t-supprimer produit
  deleteProduit(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { responseType: 'text' });
  }
}
