import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, Input, type OnInit } from '@angular/core';
import { AbstractControl, FormArray } from "@angular/forms";

@Component({
  selector: 'app-input-draggable-options',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './input-draggable-options.component.html',
  styleUrls: ['./input-draggable-options.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class InputDraggableOptionsComponent implements OnInit {

  @Input() fa = new FormArray<DraggableOption>([])

  ngOnInit(): void { ;}

  dog() {
    this.fa.get
  }

}

export interface DraggableOption extends AbstractControl {
  order: number,
  label: string,
  data: unknown
}
