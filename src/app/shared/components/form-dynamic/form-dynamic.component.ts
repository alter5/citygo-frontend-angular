import { CommonModule } from "@angular/common";
import { Input } from "@angular/core";
import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray } from "@angular/forms";

@Component({
  selector: 'app-form-dynamic',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './form-dynamic.component.html',
  styleUrls: ['./form-dynamic.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormDynamicComponent implements OnInit {
  @Input() formGroup: FormGroup | undefined

  ngOnInit(): void { ; }

}
