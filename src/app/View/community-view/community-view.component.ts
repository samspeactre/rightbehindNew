import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPaperPlane, faPlusSquare } from '@fortawesome/free-regular-svg-icons';
import { faArrowDown, faArrowUp, faComment, faHeart, faShare } from '@fortawesome/free-solid-svg-icons';
import { ResizeService } from '../../Services/resize.service';
@Component({
  standalone: true,
  imports: [FontAwesomeModule, CommonModule],
  selector: 'app-community-view',
  templateUrl: './community-view.component.html',
  styleUrls: ['./community-view.component.scss'],
})
export class CommunityViewComponent {
  faHeart = faHeart
  faArrowUp = faArrowUp
  faArrowDown = faArrowDown
  faComment = faComment
  faShare = faShare
  faPaperPlane = faPaperPlane
  faPlus = faPlusSquare
  arr=[
    {"image": "https://picsum.photos/200/200?random=1", "title": "Senior Software Engineer"},
    {"image": "https://picsum.photos/200/200?random=2", "title": "Project Manager"},
    {"image": "https://picsum.photos/200/200?random=3", "title": "Data Scientist"},
    {"image": "https://picsum.photos/200/200?random=5", "title": "DevOps Engineer"},
    {"image": "https://picsum.photos/200/200?random=6", "title": "Product Owner"},
    {"image": "https://picsum.photos/200/200?random=7", "title": "Marketing Manager"},
    {"image": "https://picsum.photos/200/200?random=8", "title": "Full Stack Developer"},
    {"image": "https://picsum.photos/200/200?random=9", "title": "Business Analyst"},
    {"image": "https://picsum.photos/200/200?random=10", "title": "Software Architect"},
    {"image": "https://picsum.photos/200/200?random=11", "title": "IT Support Specialist"},
    {"image": "https://picsum.photos/200/200?random=12", "title": "Systems Administrator"},
    {"image": "https://picsum.photos/200/200?random=13", "title": "Machine Learning Engineer"},
    {"image": "https://picsum.photos/200/200?random=14", "title": "Network Engineer"},
    {"image": "https://picsum.photos/200/200?random=15", "title": "Cybersecurity Specialist"},
    {"image": "https://picsum.photos/200/200?random=16", "title": "Database Administrator"},
    {"image": "https://picsum.photos/200/200?random=17", "title": "Frontend Developer"},
    {"image": "https://picsum.photos/200/200?random=18", "title": "Backend Developer"},
    {"image": "https://picsum.photos/200/200?random=19", "title": "Data Analyst"},
    {"image": "https://picsum.photos/200/200?random=20", "title": "Scrum Master"},
    {"image": "https://picsum.photos/200/200?random=21", "title": "Content Strategist"},
    {"image": "https://picsum.photos/200/200?random=22", "title": "SEO Specialist"},
    {"image": "https://picsum.photos/200/200?random=23", "title": "Graphic Designer"},
    {"image": "https://picsum.photos/200/200?random=24", "title": "Quality Assurance Engineer"},
    {"image": "https://picsum.photos/200/200?random=25", "title": "Cloud Architect"},
    {"image": "https://picsum.photos/200/200?random=26", "title": "IT Consultant"},
    {"image": "https://picsum.photos/200/200?random=27", "title": "Mobile App Developer"},
    {"image": "https://picsum.photos/200/200?random=28", "title": "Technical Writer"},
    {"image": "https://picsum.photos/200/200?random=29", "title": "Blockchain Developer"},
    {"image": "https://picsum.photos/200/200?random=30", "title": "Game Developer"},
    {"image": "https://picsum.photos/200/200?random=31", "title": "HR Manager"},
    {"image": "https://picsum.photos/200/200?random=32", "title": "Operations Manager"},
    {"image": "https://picsum.photos/200/200?random=33", "title": "Chief Technology Officer"},
    {"image": "https://picsum.photos/200/200?random=34", "title": "Chief Information Officer"},
    {"image": "https://picsum.photos/200/200?random=35", "title": "Financial Analyst"},
    {"image": "https://picsum.photos/200/200?random=36", "title": "Compliance Officer"}
]
arr2=[
  {"image": "https://picsum.photos/200/200?random=37", "title": "UI Designer"},
  {"image": "https://picsum.photos/200/200?random=38", "title": "Software Developer"},
  {"image": "https://picsum.photos/200/200?random=39", "title": "Data Engineer"},
  {"image": "https://picsum.photos/200/200?random=40", "title": "System Analyst"},
  {"image": "https://picsum.photos/200/200?random=41", "title": "Technical Support"},
  {"image": "https://picsum.photos/200/200?random=42", "title": "Project Coordinator"},
  {"image": "https://picsum.photos/200/200?random=43", "title": "Digital Marketer"},
  {"image": "https://picsum.photos/200/200?random=44", "title": "Network Administrator"},
  {"image": "https://picsum.photos/200/200?random=45", "title": "Web Developer"},
  {"image": "https://picsum.photos/200/200?random=46", "title": "Artificial Intelligence Specialist"},
  {"image": "https://picsum.photos/200/200?random=47", "title": "Content Manager"},
  {"image": "https://picsum.photos/200/200?random=48", "title": "Product Analyst"},
  {"image": "https://picsum.photos/200/200?random=50", "title": "Digital Designer"},
  {"image": "https://picsum.photos/200/200?random=51", "title": "Security Specialist"},
  {"image": "https://picsum.photos/200/200?random=52", "title": "Database Developer"},
  {"image": "https://picsum.photos/200/200?random=53", "title": "IT Manager"},
  {"image": "https://picsum.photos/200/200?random=54", "title": "Software Tester"},
  {"image": "https://picsum.photos/200/200?random=55", "title": "Operations Analyst"},
  {"image": "https://picsum.photos/200/200?random=56", "title": "E-commerce Specialist"},
  {"image": "https://picsum.photos/200/200?random=57", "title": "Mobile Developer"},
  {"image": "https://picsum.photos/200/200?random=58", "title": "Creative Director"},
  {"image": "https://picsum.photos/200/200?random=59", "title": "Business Development Manager"},
  {"image": "https://picsum.photos/200/200?random=60", "title": "Cloud Engineer"},
  {"image": "https://picsum.photos/200/200?random=61", "title": "UX Researcher"},
  {"image": "https://picsum.photos/200/200?random=62", "title": "AI Engineer"},
  {"image": "https://picsum.photos/200/200?random=63", "title": "Social Media Manager"},
  {"image": "https://picsum.photos/200/200?random=64", "title": "Quality Analyst"},
  {"image": "https://picsum.photos/200/200?random=65", "title": "Hardware Engineer"},
  {"image": "https://picsum.photos/200/200?random=66", "title": "UX Designer"},
  {"image": "https://picsum.photos/200/200?random=67", "title": "Software Engineer"},
  {"image": "https://picsum.photos/200/200?random=68", "title": "Digital Strategist"},
  {"image": "https://picsum.photos/200/200?random=69", "title": "Technical Consultant"},
  {"image": "https://picsum.photos/200/200?random=70", "title": "Brand Manager"}
]
constructor(public resize:ResizeService){

}

}
