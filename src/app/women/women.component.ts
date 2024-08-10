import { Component } from '@angular/core';
import { SchemeService } from '../services/scheme.service';

@Component({
  selector: 'app-women',
  templateUrl: './women.component.html',
  styleUrls: ['./women.component.scss']
})
export class WomenComponent {
  schemeList: any
 
  constructor(private schm : SchemeService){}
  ngOnInit(): void {
    this.scheme()
  }

  scheme(){
    let sam = "child"
    this.schm.searchScheme(sam).subscribe((res)=>{
      this.schemeList = res
    })
  }
}
