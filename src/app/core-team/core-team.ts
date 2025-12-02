import { Component, OnInit } from '@angular/core';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-coreteam',
  templateUrl: './core-team.html',
  styleUrls: ['./core-team.css'],
  imports: [RouterLink],
})
export class CoreTeam implements OnInit {
  
  members = [
    { name: 'Alice Johnson', role: 'CEO', img: 'assets/team1.jpg' },
    { name: 'Bob Smith', role: 'CTO', img: 'assets/team2.jpg' },
    { name: 'Clara Williams', role: 'CFO', img: 'assets/team3.jpg' },
    { name: 'David Lee', role: 'COO', img: 'assets/team4.jpg' },
  ];

  ngOnInit(): void {
    AOS.init({
      duration: 1200,
      once: true,
    });
  }
}
