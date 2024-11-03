import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalStatusEventEmitted, ModalStatusType } from '../modal.config';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatusModalService {

  public eventEmitted: Subject<ModalStatusEventEmitted> = new Subject<ModalStatusEventEmitted>();

  constructor(private modalService: NgbModal) { }

  openStatusModal(message: string, type: ModalStatusType) {
    let eventEmt: ModalStatusEventEmitted = {
      message, 
      status: type
    };
    this.eventEmitted.next(eventEmt);
  }
  
}
