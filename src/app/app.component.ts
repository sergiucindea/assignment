import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { StorageService } from './core/services/storage.service';
import { beneficiaryList } from './core/constants';
import { Subscription } from 'rxjs';
import { StatusModalComponent } from './core/components/modal/status-modal/status-modal.component';
import { StatusModalService } from './core/components/modal/status-modal/status-modal.service';
import { ModalStatusEventEmitted } from './core/components/modal/modal.config';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'assignment';
  modalConfig: any = {}

  private subs: Subscription = new Subscription();

  @ViewChild('statusModal') statusModal!: StatusModalComponent;

  constructor(private storageService: StorageService, private statusModalService: StatusModalService, private router: Router) {}

  ngOnInit(): void {
    this.storageService.saveToLocalStorage('beneficiaryList', beneficiaryList);

    this.addStatusSub();
    this.navigateToBeneficiaryPage();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  private addStatusSub() {
    let eventSub$ = this.statusModalService.eventEmitted.subscribe((model: ModalStatusEventEmitted) => {
      this.statusModal.open(model.message, model.status);
    });

    this.subs.add(eventSub$);
  }

  private navigateToBeneficiaryPage() {
    this.router.navigate(['dashboard/beneficiaries']);
  }
}
