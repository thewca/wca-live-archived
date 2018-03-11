import { Component, OnInit, Input, ViewChild, ElementRef, HostListener, HostBinding } from '@angular/core';

@Component({
  selector: 'wca-attempt-input',
  templateUrl: './attempt-input.component.html',
  styleUrls: ['./attempt-input.component.scss']
})
export class AttemptInputComponent implements OnInit {

  @Input() public mode: 'time' | 'puzzles' | 'moves' = 'time';
  @ViewChild('input') public input: ElementRef;
  @HostListener('click') public onClick() {
    this.input.nativeElement.focus();
  }

  public formattedValue = '';
  private value = '';
  private isDnf = false;
  private isDns = false;

  public get displayFontSize() {
    return (this.input.nativeElement.offsetHeight * .9) + 'px';
  }

  public get displayLineHeight() {
    return this.input.nativeElement.offsetHeight + 'px';
  }

  public constructor() { }

  public ngOnInit() {
    this.formatValue();
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
      default:
        if (this.isDnf || this.isDns) {
          break;
        }
        this.value += pressedKey;
        if (this.value.length > 6) {
          this.value = this.value.substr(0, 6);
        }
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
        let cs = ('0000'+v).substr(-2, 2);
        let s = ('0000'+v).substr(-4, 2);
        let m = v.substring(0, v.length - 4);
        if (!m) {
          m = '00';
        }
        if (m.length === 1) {
          m = '0' + m;
        }
        // regulation 9f2: Results >= 10 minutes are rounded to seconds
        if (parseInt(m, 10) >= 10) {
          if (parseInt(cs, 10) >= 50) {
            let t = parseInt(s, 10);
            t++;
            if (t == 60) {
              t = 0;
              m = ''+(parseInt(m, 10) + 1);
            }
            s = ('0000'+t).substr(-2, 2);
          }
          cs = '00';
        }
        this.formattedValue = `${m}:${s}.${cs}`;
        break;
    }
  }

}
