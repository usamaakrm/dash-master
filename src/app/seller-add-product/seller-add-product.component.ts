import { Component } from '@angular/core';
import { product } from '../data-type';
import { ProductService } from '../services/product.service';
import { SchemeService } from '../services/scheme.service';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.scss']
})
export class SellerAddProductComponent {
  addProductMessage: string | undefined = "";
  constructor(private product: ProductService, private schm : SchemeService) { }

  submit(data: product) {
    this.schm.addSceheme(data).subscribe((result) => {
      console.log(result);
      if (result) {
        this.addProductMessage = "Scheme is added Successfully"
      }
    })

    setTimeout(()=>{
      this.addProductMessage=undefined
    },3000)
  }

}
