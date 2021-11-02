import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {faTimes} from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {
  @Output() public childEvent = new EventEmitter();
  @Input() public text!: string;
  faTimes = faTimes;
  constructor() { }

  ngOnInit(): void {
  }

  closePopUp(){
    this.childEvent.emit();
  }
}
