import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {
  @Output() public childEvent = new EventEmitter();
  @Input() public text!: string;
  constructor() { }

  ngOnInit(): void {
  }

  closePopUp(){
    this.childEvent.emit();
  }
}
