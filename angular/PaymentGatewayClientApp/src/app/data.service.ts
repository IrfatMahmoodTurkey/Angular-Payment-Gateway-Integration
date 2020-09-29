import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) {
    
   }

  // get services
  get_services(){
    return this.http.get('https://localhost:44320/api/services/get');
  }

  // pay and submit
  pay_and_submit(customerInfo, price, services:any){
    const body:FormData = new FormData();

    body.append('CustomerName', customerInfo.name);
    body.append('Address', customerInfo.address);
    body.append('Phone', customerInfo.phone);
    body.append('Services', JSON.stringify(services));
    body.append('TotalAmount', price);

    console.log('calling');
    
    return this.http.post("https://localhost:44320/api/services/pay", body);
  }

  // check transaction history for message
  check_transaction_status_for_message(id){
    return this.http.get('https://localhost:44320/api/services/check?id='+id);
  }
}
