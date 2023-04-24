import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Renderer2,
  ViewChild
} from '@angular/core';
import { IIconButtonComponentConfig } from 'ircc-ds-angular-component-library';

@Component({
  selector: 'app-resizable-container',
  templateUrl: './resizable-container.component.html',
  styleUrls: ['./resizable-container.component.scss']
})
export class resizableContainerComponent {
  @ViewChild('resizeBar', { static: false }) resizeBar: ElementRef | undefined;
  @ViewChild('resizeContainer', { static: false }) resizeContainer:
    | ElementRef
    | undefined;

  @Input() minHeight: number = 150;
  @Input() setHeight: number = 150;

  @Output() getHeight = new EventEmitter<number>();

  isDragging = false;
  dragListener: Function | undefined;

  resizeButtonConfig: IIconButtonComponentConfig = {
    id: 'resize_button',
    category: 'custom',
    size: 'small',
    ariaLabel: 'RESIZE_ARIA',
    icon: {
      class: 'fa-regular fa-grip-lines',
      color: 'var(--text-primary)'
    }
  };

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit() {
    if (this.resizeContainer) {
      this.renderer.setStyle(
        this.resizeContainer.nativeElement,
        'min-height',
        this.minHeight + 'px'
      );
      this.renderer.setStyle(
        this.resizeContainer.nativeElement,
        'height',
        this.setHeight + 'px'
      );
    }

    if (this.resizeBar) {
      this.dragListener = this.renderer.listen(
        this.resizeBar?.nativeElement,
        'mousedown',
        () => {
          this.isDragging = true;
        }
      );
    }

    this.dragListener = this.renderer.listen(
      'document',
      'mousemove',
      (event: MouseEvent) => {
        if (this.isDragging && this.resizeContainer) {
          this.renderer.setStyle(
            this.resizeContainer.nativeElement,
            'height',
            this.resizeContainer.nativeElement.getBoundingClientRect().height +
              event.movementY +
              'px'
          );
          this.getHeight.emit(
            this.resizeContainer.nativeElement.getBoundingClientRect().height +
              event.movementY
          );
        }
      }
    );

    this.dragListener = this.renderer.listen('document', 'mouseup', () => {
      this.isDragging = false;
    });
  }
}
