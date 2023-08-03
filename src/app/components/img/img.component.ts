import { Component, OnInit, Input, Output, EventEmitter, OnChanges, AfterViewInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})
export class ImgComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  imgDefault = './assets/default.png';
  counter = 0;
  counterFn: number | undefined;

  @Input() img: string = 'something';
  @Output() loaded = new EventEmitter<string>();

  constructor () {
    console.log('constructor', 'imgValue =>', this.img)
  }

  ngOnInit(): void {
    console.log('ngOnInit', 'imgValue =>', this.img);
    // this.counterFn = window.setInterval(() => {
    //   this.counter +=1;
    //   console.log('run counter') 
    // } , 1000)
  }

  ngOnChanges() {
    console.log('ngOnChanges', 'imgValue =>', this.img);
  }

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit');
  }

  ngOnDestroy(): void {
    console.log('ngOnDestroy');
    window.clearInterval(this.counterFn);
  }

  imgError() {
    this.img = this.imgDefault;
  }

  imgLoaded() {
    console.log('load hijo');
    this.loaded.emit(this.img);
  }
}
