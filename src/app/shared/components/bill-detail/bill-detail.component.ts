import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BillService } from 'src/app/core/services/bill.service';

@Component({
  selector: 'app-bill-detail',
  templateUrl: './bill-detail.component.html',
  styleUrls: ['./bill-detail.component.scss']
})
export class BillDetailComponent implements OnInit {

dataBill: any;
  date: Date = new Date();

  constructor(private activatedRoute: ActivatedRoute, private billService: BillService) {
    this.activatedRoute.params.subscribe(params => {
      this.dataBill = this.billService.getBill(parseInt(params['id'], 10));
      console.log('%c⧭', 'color: #731d1d', this.dataBill);
    });
  }

  ngOnInit(): void {
 
  }

  printer(): void {
    window.print();
  }

}
