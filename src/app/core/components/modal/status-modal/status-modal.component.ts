import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ModalConfig, ModalStatusConfig, ModalStatusEventEmitted, ModalStatusType } from '../modal.config';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-status-modal',
  templateUrl: './status-modal.component.html',
  styleUrls: ['./status-modal.component.scss']
})
export class StatusModalComponent implements OnInit {

  @Input() modalConfig!: ModalConfig;
  @ViewChild('modal') modalComp!: TemplateRef<StatusModalComponent>;

  protected status!: string;
  protected headerClass!: string;
  protected message!: string;
  protected btnClass!: string;
  protected statusIcon!: string;
  protected statusIconStyle!: { [klass: string]: any; };
  private modalRef!: NgbModalRef;

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
    if(this.modalConfig.options === undefined) 
      this.modalConfig.options = {}
    
    this.modalConfig.options.centered = true;
    this.modalConfig.options.backdrop = 'static';
  }

  open(msg: string, type: ModalStatusType) {
    this.setStatusModalUI(type);
    this.message = msg;
    this.modalConfig.options.size = 'l';
    this.modalConfig.options.centered = true;
    this.modalRef = this.modalService.open(this.modalComp, this.modalConfig.options);
  }

  setStatusModalUI(type: ModalStatusType) {
    switch (type) {
      case ModalStatusType.Error:
        this.headerClass = 'bg-danger';
        this.btnClass = 'btn-danger';
        this.status = 'Error';
        this.statusIcon = '<i class="pi pi-times-circle"></i>';
        this.statusIconStyle = {'color': 'darkred'};
        break;
      case ModalStatusType.Success:
        this.headerClass = 'bg-success';
        this.btnClass = 'btn-success';
        this.status = 'Success';
        this.statusIcon = '<i class="pi pi-check-circle"></i>';
        this.statusIconStyle = {'color': '#198754'};
        break;
      case ModalStatusType.Warning:
        this.headerClass = 'bg-warning';
        this.btnClass = 'btn-warning';
        this.status = 'Warning';
        this.statusIcon = '<i class="pi pi-exclamation-triangle"></i>';
        this.statusIconStyle = {'color': '#ffc107'};
        break;
      default:
        break;
    }
  }

  close() {
    this.modalRef.close();
  }

}
