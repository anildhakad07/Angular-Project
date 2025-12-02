import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import AOS from 'aos';
import 'aos/dist/aos.css';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
  imports: [RouterLink],
})
export class Home implements OnInit {
  ngOnInit(): void {
    AOS.init({
      duration: 1200,
      once: true,
    });
  }
}
