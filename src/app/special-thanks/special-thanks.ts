import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import AOS from 'aos';
import 'aos/dist/aos.css';
@Component({
  selector: 'app-specialthanks',
  imports: [RouterLink,CommonModule],
  templateUrl: './special-thanks.html',
  styleUrl: './special-thanks.css',
})
export class Specialthanks implements OnInit {
  thanksList = [
    { name: 'Alice Johnson', contribution: 'Mentorship & Guidance' },
    { name: 'Bob Smith', contribution: 'Technical Support' },
    { name: 'Clara Williams', contribution: 'Design Inspiration' },
    { name: 'David Lee', contribution: 'Project Review' },
    { name: 'Eve Adams', contribution: 'Creative Ideas' },
  ];

  ngOnInit(): void {
      AOS.init({
        duration: 1200,
        once: true,
      });
    }
}
