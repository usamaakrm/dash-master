import { Component } from '@angular/core';
import { SchemeService } from '../services/scheme.service';

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.scss']
})
export class SocialComponent {
  schemeList: any
 
  constructor(private schm : SchemeService){}
  ngOnInit(): void {
    this.scheme()
  }

  scheme(){
    let sam = "social"
    this.schm.searchScheme(sam).subscribe((res)=>{
      this.schemeList = res
    })
  }
}
