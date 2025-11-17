import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PageComponent } from '../../../../../../../Downloads/theme-lavande-complete_6/angular-components/components/page/page.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [PageComponent, RouterLink],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {}
