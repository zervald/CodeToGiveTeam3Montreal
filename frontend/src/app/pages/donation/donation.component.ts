import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PageComponent} from '../../../../../../../Downloads/theme-lavande-complete_6/angular-components/components/page/page.component';
import {DonationFormComponent} from '../../../../../../../Downloads/theme-lavande-complete_6/angular-components/components/donation-form/donation-form.component';

@Component({
  selector: 'app-donation',
  standalone: true,
  imports: [
    CommonModule,
    PageComponent,
    DonationFormComponent
  ],
  templateUrl: './donation.component.html',
  styleUrls: ['./donation.component.css']
})
export class DonationComponent {}
