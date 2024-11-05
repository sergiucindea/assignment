import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ModalConfig } from './modal.config';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @ViewChild('modal') modalContent!: TemplateRef<ModalComponent>;
  @Input() modalConfig!: ModalConfig;
  protected buttonColor!: string;
  public modalRef!: NgbModalRef;
  
  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
    this.modalConfig.options.backdrop = 'static';
    this.modalConfig.options.centered = true;
  }

  open() {
    this.modalRef = this.modalService.open(this.modalContent, this.modalConfig.options);
  }

  closeAll() {
    this.modalService.dismissAll();
  }

  close() {
    if (this.modalRef) {
      this.modalRef.close();
    }
  }

}
