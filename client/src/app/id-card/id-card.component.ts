import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-id-card',
  templateUrl: './id-card.component.html',
  styleUrl: './id-card.component.scss'
})
export class IdCardComponent { 
  @Input() employee: any;

}
