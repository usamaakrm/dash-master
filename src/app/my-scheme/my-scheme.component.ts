import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SchemeService } from '../services/scheme.service';

@Component({
  selector: 'app-my-scheme',
  templateUrl: './my-scheme.component.html',
  styleUrls: ['./my-scheme.component.scss']
})
export class MySchemeComponent {
  schemeList: any
  constructor(private activeRoute: ActivatedRoute, private schm: SchemeService){}
  ngOnInit() :void{}

  male(data: any){
    this.schm.searchGenderScheme(data).subscribe((res)=>{
        this.schemeList = res
   })
}

women(data: any){
  this.schm.searchGenderScheme(data).subscribe((res)=>{
      this.schemeList = res
 })
}
    
trans(data: any){
  this.schm.searchGenderScheme(data).subscribe((res)=>{
      this.schemeList = res
 })
}
}
