import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from './data.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  addServiceForm;
  services = [];
  db_services = [];
  total_price;
  message;

  customerForm;

  constructor(private route:ActivatedRoute, private data_service: DataService) {
  }

  ngOnInit() {
    this.addServiceForm = new FormGroup({
      service: new FormControl('1', [Validators.required]),
      quantity: new FormControl('1', [Validators.required])
    });

    this.customerForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
    });

    this.data_service.get_services().subscribe(data => { this.bind_db_services(data) });

    this.calculate_total_price();

    this.view_success_message();
  }

  bind_db_services(data) {
    this.db_services = data;
  }

  // calculate total price
  calculate_total_price(){
    this.total_price = 0.0;
    for(let i=0;i<this.services.length;i++){
      this.total_price = this.total_price + this.services[i].Price;
    }
  }

  // add service
  addService(formValue) {
    let price = 0.00;
    let name;

    for (let i = 0; i < this.db_services.length; i++) {
      if (formValue.service == this.db_services[i].id) {
        price = this.db_services[i].servicePrice;
        name = this.db_services[i].serviceName;
      }
    }

    let json = {
      "ServiceId": formValue.service,
      "ServiceName": name,
      "Quantity": formValue.quantity,
      "Price": price * formValue.quantity
    };

    this.services.push(json);
    this.calculate_total_price();
  }

  // remove service
  remove_service(value) {
    this.services.splice(value, 1);
    this.calculate_total_price();
  }

  // quantity increment
  increment_quantity(value) {
    let prev_quantity = parseInt(this.services[value].Quantity);
    let new_quantity = prev_quantity + 1;
    this.services[value].Quantity = new_quantity;

    let price = 0.0;
    for (let i = 0; i < this.db_services.length; i++) {
      if (this.services[value].ServiceId == this.db_services[i].id) {
        price = this.db_services[i].servicePrice;
      }
    }

    this.services[value].Price = price * new_quantity;
    this.calculate_total_price();
  }

  // quantity decrement
  decrement_quantity(value) {
    let prev_quantity = parseInt(this.services[value].Quantity);
    let new_quantity = prev_quantity - 1;

    if (new_quantity > 0) {
      this.services[value].Quantity = new_quantity;

      let price = 0.0;
      for (let i = 0; i < this.db_services.length; i++) {
        if (this.services[value].ServiceId == this.db_services[i].id) {
          price = this.db_services[i].servicePrice;
        }
      }

      this.services[value].Price = price * new_quantity;
      this.calculate_total_price();
    }
  }

  // submit for pay
  submit(customerForm){
    console.log(this.services.toString());
    this.data_service.pay_and_submit(customerForm, this.total_price, this.services).subscribe(data => {this.redirect_gateway(data)});
  }

  redirect_gateway(data){
    document.location.href = data.url
  }

  // view success message
  view_success_message(){
    let message = localStorage.getItem('success_message');
    console.log(message);

    if(message != null){
      if(message == 'success'){
        this.message = 'Payment Successful';
      }
      else{
        this.message = null;
      }

      localStorage.setItem("success_message", null);
    }
    else{
      this.message = null;
    }
  }
}
