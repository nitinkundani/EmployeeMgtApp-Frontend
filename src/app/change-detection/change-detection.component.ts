import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DataProviderService } from '../shared/data-provider.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-detection',
  // inputs: ['live'],
  templateUrl: './change-detection.component.html',
  styleUrls: ['./change-detection.component.css']
})
export class ChangeDetectionComponent implements OnInit {

  live: boolean = true;
  constructor(private router: Router ,public dataProvider: DataProviderService, private ref: ChangeDetectorRef) { }

  ngOnInit() {
    // console.log('Data' + this.dataProvider.data);
  }

  updateLive(){
    if(this.live){
      this.ref.reattach();
    }
    else{
      this.ref.detach();
    }
  }

  moveToHome(){
    this.router.navigate(['/home']);
  }

  detectCurrentData(){
    this.ref.detectChanges();
  }

}
