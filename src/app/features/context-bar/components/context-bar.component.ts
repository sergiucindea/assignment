import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CtxBarBtnConfig } from '../models/ctx-bar-btn.config.model';
import { CtxBarConfig } from '../models/ctx-bar-config.model';

@Component({
  selector: 'app-context-bar',
  templateUrl: './context-bar.component.html',
  styleUrl: './context-bar.component.scss'
})
export class ContextBarComponent implements OnInit {
  @Input() btnList: CtxBarBtnConfig[] = [];
  @Input() btnConfig: CtxBarConfig = {};
  @Output() buttonClick = new EventEmitter<{ btn: any, key: string }>();
  constructor() {}

  ngOnInit(): void {
    
  }

  onButtonClick(btn: any, index: number) {
    if (this.btnList.length > 0) {
      let key = this.btnList.find((btn: any) => btn.id === index)!.key!;
      this.buttonClick.emit({ btn, key });
    }
  }
}
