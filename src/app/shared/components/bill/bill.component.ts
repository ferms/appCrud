import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { products } from 'src/app/core/mock/products';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss']
})
export class BillComponent implements OnInit {

  public products: any[] = products;
  formGroup: FormGroup | undefined;

  constructor(private formBuilder: FormBuilder) {
    this.createFormGroup = this.createFormGroup.bind(this);
  }

  ngOnInit(): void {
  }

  public createFormGroup(args: any): FormGroup {
    const item = args.isNew ? new Product() : args.dataItem;

    this.formGroup = this.formBuilder.group({
      ProductID: item.ProductID,
      ProductName: [item.ProductName, Validators.required],
      UnitPrice: item.UnitPrice,
      UnitsInStock: [
        item.UnitsInStock,
        Validators.compose([
          Validators.required,
          Validators.pattern('^[0-9]{1,3}'),
        ]),
      ],
      Discontinued: item.Discontinued,
    });

    return this.formGroup;
  }

}


export class Product {
  public ProductID: number | undefined;
  public ProductName = '';
  public Discontinued = false;
  public UnitsInStock: number | undefined;
  public UnitPrice = 0;
}