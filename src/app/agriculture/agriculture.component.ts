import { Component } from '@angular/core';
import { SchemeService } from '../services/scheme.service';

@Component({
  selector: 'app-agriculture',
  templateUrl: './agriculture.component.html',
  styleUrls: ['./agriculture.component.scss']
})
export class AgricultureComponent {

  schemeList: any
 
  constructor(private schm : SchemeService){}
  ngOnInit(): void {
    this.scheme()
  }

  scheme(){
    let sam = "agriculture"
    this.schm.searchScheme(sam).subscribe((res)=>{
      this.schemeList = res
    })
  }
}
