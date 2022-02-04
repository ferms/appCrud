import { Directive, ElementRef, ViewContainerRef } from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[popupAnchor]',
  exportAs: 'popupAnchor'
})
export class PopupAnchorDirective {
  constructor(public element: ElementRef) { }
}
