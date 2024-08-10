import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SchemeService } from '../services/scheme.service';

@Component({
  selector: 'app-scheme-details',
  templateUrl: './scheme-details.component.html',
  styleUrls: ['./scheme-details.component.scss']
})
export class SchemeDetailsComponent {
  schemeList: any
  addProductMessage: any
  constructor(private activeRoute: ActivatedRoute, private schm: SchemeService){}
  ngOnInit() {
  let productId = this.activeRoute.snapshot.paramMap.get('schemeId')
  productId && this.schm.searchIdScheme(productId).subscribe((res)=>{
    this.schemeList = res
    console.log(res,'res');
    
  })
}

message(data: any){
  this.schm.message(data).subscribe((result) => {
    console.log(result);
    if (result) {
      this.addProductMessage =  " Message send Successfully"
    }
  })

  setTimeout(()=>{
    this.addProductMessage=undefined
  },3000)
}
}
