import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  popularProducts: any
  filterCategory: any;
  p: number = 0;

  constructor(private product: ProductService) { }
  ngOnInit(): void {
    this.product.productList().subscribe((data) => {
      this.popularProducts = data.reverse()
      this.filterCategory = data;
    })
  }


  filter(category: any) {
    this.filterCategory = this.popularProducts
      .filter((result: any) => {
        if (result.category == category || category == "") {
          console.log("data",result);
          return result;
        }
      })
  }


}
