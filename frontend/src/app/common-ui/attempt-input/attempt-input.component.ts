import { Component, OnInit, Input, ViewChild, ElementRef, HostListener, HostBinding } from '@angular/core';
import { TimeService } from '../../common-services/time/time.service';

@Component({
  selector: 'wca-attempt-input',
  templateUrl: './attempt-input.component.html',
  styleUrls: ['./attempt-input.component.scss']
})
export class AttemptInputComponent implements OnInit {

  @Input() public mode: 'time' | 'puzzles' | 'moves' = 'time';
  @ViewChild('input') public input: ElementRef;
  @HostListener('click') public onClick() {
    if (this.input) this.input.nativeElement.focus();
  }
  @HostListener('focus') public onFocus() {
    if (this.input) this.input.nativeElement.focus();
  }

  public formattedValue = '';
  private value = '';
  private isDnf = false;
  private isDns = false;

  public displayFontSize: string = '0px';
  public displayLineHeight: string = '0px';

  public constructor() { }

  public ngOnInit() {
    this.formatValue();
  }

  public ngAfterViewInit() {
    Promise.resolve(null).then(() => this.calcSizes());
  }

  public calcSizes() {
    this.displayFontSize = this.input ? (this.input.nativeElement.offsetHeight * .9) + 'px' : '0px';
    this.displayLineHeight = this.input ? this.input.nativeElement.offsetHeight + 'px' : '0px';
  }

  public handleKey(pressedKey: string) {
    switch (pressedKey) {
      case '/':
        this.isDnf = true;
        break;
      case '*':
        this.isDns = true;
        break;
      case 'Delete':
        this.isDnf = false;
        this.isDns = false;
        this.value = '';
        break;
      case 'Backspace':
        if (this.isDnf || this.isDns) {
          this.isDnf = false;
          this.isDns = false;
        } else {
          this.value = this.value.substr(0, this.value.length - 1);
        }
        break;
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
      case '0':
        if (this.isDnf || this.isDns) {
          break;
        }
        this.value += pressedKey;
        if (this.value.length > 6) {
          this.value = this.value.substr(0, 6);
        }
        if (this.mode === 'moves' && parseInt(this.value, 10) > 80) {
          this.isDnf = true; // Regulation E2d1
        }
        break;
      default:
        break;
    }
    this.formatValue();
  }

  public formatValue() {
    if (this.isDnf) {
      this.formattedValue = 'DNF';
      return;
    }
    if (this.isDns) {
      this.formattedValue = 'DNS';
      return;
    }
    if (!this.value || this.value === '' || this.value === '0') {
      this.formattedValue = this.mode === 'time' ? '00:00.00' : '0';
      return;
    }
    let v = this.value;
    switch (this.mode) {
      case 'puzzles':
      case 'moves':
        this.formattedValue = v;
        break;
      case 'time':
        this.formattedValue = TimeService.InputToDisplay(this.value);
        break;
    }
  }

}
