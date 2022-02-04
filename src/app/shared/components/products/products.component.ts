import { Component, Inject, OnInit,  } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ProductsService } from 'src/app/core/services/products.service';

import { map } from 'rxjs/operators';

import { categories } from 'src/app/core/mock/categories';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { Observable } from 'rxjs';
import { State, process } from '@progress/kendo-data-query';
import { EditService } from 'src/app/core/services/edit.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})


export class ProductsComponent implements OnInit {

  // public gridData!: any[];
  // public categories: any[] = categories;
  // public formGroup: FormGroup | undefined;
  // private editedRowIndex: number | undefined;

  // constructor(private service: ProductsService) {
  // }

  // public ngOnInit(): void {
  //   this.gridData = this.service.products();
  // }

  // public category(id: number): any {
  //   return this.categories.find(x => x.CategoryID === id);
  // }

  // public addHandler( { sender }: { sender: any }) {
  //   this.closeEditor(sender);

  //   this.formGroup = createFormGroup({
  //     'ProductName': '',
  //     'UnitPrice': 0,
  //     'UnitsInStock': '',
  //     'CategoryID': 1
  //   });

  //   sender.addRow(this.formGroup);
  // }

  // public editHandler({ sender, rowIndex, dataItem }: { sender: any, rowIndex: any, dataItem: any  }) {
  //   this.closeEditor(sender);

  //   this.formGroup = createFormGroup(dataItem);

  //   this.editedRowIndex = rowIndex;

  //   sender.editRow(rowIndex, this.formGroup);
  // }

  // public cancelHandler({ sender, rowIndex }: { sender: any, rowIndex: any}) {
  //   this.closeEditor(sender, rowIndex);
  // }

  // public saveHandler({ sender, rowIndex, formGroup, isNew }: { sender: any, rowIndex: any, formGroup: any, isNew: boolean  } ): void {
  //   const product = formGroup.value;

  //   this.service.save(product, isNew);

  //   sender.closeRow(rowIndex);
  // }

  // public removeHandler({ dataItem }: { dataItem: any }): void {
  //   this.service.remove(dataItem);
  // }

  // private closeEditor(grid: any, rowIndex = this.editedRowIndex) {
  //   grid.closeRow(rowIndex);
  //   this.editedRowIndex = undefined;
  //   this.formGroup = undefined;
  // }








  public view: Observable<any> | undefined;
  public gridState = {
    sort: [],
    skip: 0,
    take: 10,
  };
  formGroup: FormGroup | undefined;

   editService: EditService;
   editedRowIndex: number | undefined;

  constructor(@Inject(EditService) editServiceFactory: any) {
    this.editService = editServiceFactory();
  }

  public ngOnInit(): void {
    this.view = this.editService.pipe(
      map((data) => process(data, this.gridState))
    );

    this.editService.read();
  }


  public onStateChange(state: any): void {
    this.gridState = state;

    this.editService.read();
  }

 
  public addHandler({ sender }: { sender: any }): void {
    this.closeEditor(sender);

    this.formGroup = new FormGroup({
      ProductID: new FormControl(),
      ProductName: new FormControl('', Validators.required),
      UnitPrice: new FormControl(0),
      UnitsInStock: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[0-9]{1,3}'),
        ])
      ),
      Discontinued: new FormControl(false),
    });

    sender.addRow(this.formGroup);
  }


  public editHandler({ sender, rowIndex, dataItem }: { sender: any, rowIndex: any, dataItem: any }): void {
    this.closeEditor(sender);

    this.formGroup = new FormGroup({
      ProductID: new FormControl(dataItem.ProductID),
      ProductName: new FormControl(dataItem.ProductName, Validators.required),
      UnitPrice: new FormControl(dataItem.UnitPrice),
      UnitsInStock: new FormControl(
        dataItem.UnitsInStock,
        Validators.compose([
          Validators.required,
          Validators.pattern('^[0-9]{1,3}'),
        ])
      ),
      Discontinued: new FormControl(dataItem.Discontinued),
    });

    this.editedRowIndex = rowIndex;

    sender.editRow(rowIndex, this.formGroup);
  }

  public cancelHandler({ sender, rowIndex }: { sender: any, rowIndex: any }): void {
    this.closeEditor(sender, rowIndex);
  }

  public saveHandler({ sender, rowIndex, formGroup, isNew }: { sender: any, rowIndex: any, formGroup: any, isNew: any }): void {
    const product: Product = formGroup.value;

    this.editService.save(product, isNew);

    sender.closeRow(rowIndex);
  }

  public removeHandler({ dataItem }: { dataItem: any }): void {
    this.editService.remove(dataItem);
  }

  private closeEditor(grid: any, rowIndex = this.editedRowIndex): void {
    grid.closeRow(rowIndex);
    this.editedRowIndex = undefined;
    this.formGroup = undefined;
  }














}
export class Product {
  public ProductID: number | undefined;
  public ProductName = '';
  public Discontinued = false;
  public UnitsInStock: number | undefined;
  public UnitPrice = 0;
}
