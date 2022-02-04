import { Component, Inject, OnInit, } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { categories } from 'src/app/core/mock/categories';
import { BillService } from 'src/app/core/services/bill.service';
import { Router } from '@angular/router';

// tslint:disable-next-line:max-line-length
const createFormGroup = (dataItem: { ProductID: any; ProductName: any; UnitPrice: any; UnitsInStock: any; CategoryID: any; }) => new FormGroup({
  ProductID: new FormControl(dataItem.ProductID),
  ProductName: new FormControl(dataItem.ProductName, Validators.required),
  UnitPrice: new FormControl(dataItem.UnitPrice),
  UnitsInStock: new FormControl(dataItem.UnitsInStock, Validators.compose([Validators.required, Validators.pattern('^[0-9]{1,3}')])),
  CategoryID: new FormControl(dataItem.CategoryID, Validators.required)
});

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss']
})
export class BillComponent implements OnInit {


  public gridData: any[] = [''];
  public categories: any[] = categories;
  formGroup: FormGroup | undefined;
  editedRowIndex: number | undefined;

  constructor(private service: BillService, private router: Router ) {
  }

  public ngOnInit(): void {
    this.gridData = this.service.products();
  }

  public category(id: number): any {
    return this.categories.find(x => x.CategoryID === id);
  }

  public addHandler({ sender }: { sender: any}): void {
    this.closeEditor(sender);

    this.formGroup = createFormGroup({
  ProductName: '',
  UnitPrice: 0,
  UnitsInStock: '',
  CategoryID: 1,
  ProductID: undefined
});

    sender.addRow(this.formGroup);
  }

  public editHandler({ sender, rowIndex, dataItem}: { sender: any, rowIndex: any, dataItem: any }): void {
    this.closeEditor(sender);

    this.formGroup = createFormGroup(dataItem);

    this.editedRowIndex = rowIndex;

    sender.editRow(rowIndex, this.formGroup);
  }

  public cancelHandler({ sender, rowIndex }: { sender: any, rowIndex: any }): void {
    this.closeEditor(sender, rowIndex);
  }

  public saveHandler({ sender, rowIndex, formGroup, isNew }: { sender: any, rowIndex: any, formGroup: any, isNew: any }): void {
    const product = formGroup.value;

    this.service.save(product, isNew);

    sender.closeRow(rowIndex);
  }

  public removeHandler({ dataItem }: { dataItem: any }): void {
    this.service.remove(dataItem);
  }

  private closeEditor(grid: any, rowIndex = this.editedRowIndex): void  {
    grid.closeRow(rowIndex);
    this.editedRowIndex = undefined;
    this.formGroup = undefined;
  }

  viewDetail(id: any): void {
    this.router.navigate(['/bill-detail/' + id]);
  }


}
export class Product {
  public ProductID: number | undefined;
  public ProductName = '';
  public Discontinued = false;
  public UnitsInStock: number | undefined;
  public UnitPrice = 0;
}
