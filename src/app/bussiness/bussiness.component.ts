import { Component } from '@angular/core';
import { SchemeService } from '../services/scheme.service';
@Component({
  selector: 'app-bussiness',
  templateUrl: './bussiness.component.html',
  styleUrls: ['./bussiness.component.scss']
})
export class BussinessComponent {
  schemeList: any
 
  constructor(private schm : SchemeService){}
  ngOnInit(): void {
    this.scheme()
  }

  scheme(){
    let sam = "bussiness"
    this.schm.searchScheme(sam).subscribe((res)=>{
      this.schemeList = res
    })
  }
}
