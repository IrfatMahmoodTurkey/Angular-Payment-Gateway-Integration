import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit {
  id;

  constructor(private route:ActivatedRoute, private data_service:DataService) {
    this.id = this.route.snapshot.paramMap.get("id");
  }

  ngOnInit(): void {
    this.data_service.check_transaction_status_for_message(this.id).subscribe(data => {
      this.decide(data);
    });
  }

  decide(data){
    console.log(data);
    if(data == '1'){
      localStorage.setItem("success_message", 'success');
    }
    else{
      localStorage.setItem("success_message", null);
    }
    document.location.href = "http://localhost:4200/";
  }
}
