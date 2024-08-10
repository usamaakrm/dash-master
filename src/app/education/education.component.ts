import { Component } from '@angular/core';
import { SchemeService } from '../services/scheme.service';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent {
  schemeList: any
 
  constructor(private schm : SchemeService){}
  ngOnInit(): void {
    this.scheme()
  }

  scheme(){
    let sam = "education"
    this.schm.searchScheme(sam).subscribe((res)=>{
      this.schemeList = res
    })
  }
}
