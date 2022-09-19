import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nuevo-bloque',
  templateUrl: './nuevo-bloque.component.html',
  styleUrls: ['./nuevo-bloque.component.scss']
})
export class NuevoBloqueComponent implements OnInit {

  bloque = [];
  
  constructor() { }

  ngOnInit(): void {
  }

}
