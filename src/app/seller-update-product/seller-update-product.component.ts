import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.scss']
})
export class SellerUpdateProductComponent {
  productData: undefined | product;
  productMessage: undefined | string;
  data: any;

  constructor(private route: ActivatedRoute, private product: ProductService) { }
  ngOnInit(): void {
    // we mention id in router file
    let productId = this.route.snapshot.paramMap.get('id')
    productId && this.product.getProduct(productId).subscribe((result) => {
      this.productData = result
    })
  }


  submit(data: any) {
    if (this.productData) {
      data.id = this.productData.id
    }
    this.product.updateProduct(data).subscribe((result) => {
      if (result) {
        this.productMessage = "Successfully  Updated"
      }
    })
    setTimeout(() => {
      this.productMessage = undefined
    }, 3000);
  }
}
