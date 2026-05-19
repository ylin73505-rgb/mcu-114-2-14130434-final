import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface RawProduct {
  id: string;
  name: string;
  authors: string[] | string;
  company?: string;
  photoUrl?: string;
  price?: number;
}

export interface ProductDto {
  title: string;
  authors: string;
  publisher: string;
  price: number;
}

@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly http = inject(HttpClient);

  async getAll(): Promise<ProductDto[]> {
    const data = (await this.http.get<{ products: RawProduct[] }>('/assets/db.json').toPromise()) || { products: [] };
    return (data.products || []).map((p) => ({
      title: p.name,
      authors: Array.isArray(p.authors) ? p.authors.join('、') : String(p.authors || ''),
      publisher: p.company || '',
      price: Number(p.price) || 0,
    }));
  }
}
