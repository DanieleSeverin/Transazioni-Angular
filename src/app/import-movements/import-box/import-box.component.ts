import { animate, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-import-box',
  templateUrl: './import-box.component.html',
  styleUrls: ['./import-box.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-20px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
      transition(':leave', [
        animate('300ms ease-out', style({ opacity: 0, transform: 'translateY(-20px)' })),
      ]),
    ]),
  ]
})
export class ImportBoxComponent {

  @Input() uploadedFile: File | null = null;
  @Output() fileSelected = new EventEmitter<File>();
  @Output() fileSended = new EventEmitter();
  
  constructor() { }

  onDragOver(event: any) {
    event.preventDefault();
    event.stopPropagation();
  }

  onDrop(event: any) {
    event.preventDefault();
    event.stopPropagation();
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      this.fileSelected.emit(files[0]);
    }
  }

  onFileSelected(event: any) {
    const files = event.target.files;
    if (files.length > 0) {
      this.fileSelected.emit(files[0]);
    }
  }

  sendFile(){
    this.fileSended.emit();
  }

}
