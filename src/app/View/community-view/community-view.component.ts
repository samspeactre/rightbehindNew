import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPaperPlane, faPlusSquare } from '@fortawesome/free-regular-svg-icons';
import { faArrowDown, faArrowUp, faComment, faHeart, faShare } from '@fortawesome/free-solid-svg-icons';
import { ResizeService } from '../../Services/resize.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../../Services/http.service';
import { Subject, finalize, takeUntil } from 'rxjs';
import { assetUrl } from '../../Services/helper.service';
import { FormsModule } from '@angular/forms';
@Component({
  standalone: true,
  imports: [FontAwesomeModule, CommonModule, FormsModule],
  selector: 'app-community-view',
  templateUrl: './community-view.component.html',
  styleUrls: ['./community-view.component.scss'],
})
export class CommunityViewComponent {
  src = assetUrl
  faHeart = faHeart
  faArrowUp = faArrowUp
  faArrowDown = faArrowDown
  faComment = faComment
  faShare = faShare
  faPaperPlane = faPaperPlane
  faPlus = faPlusSquare
  arr2 = [
    { "image": "https://picsum.photos/200/200?random=37", "title": "UI Designer" },
    { "image": "https://picsum.photos/200/200?random=38", "title": "Software Developer" },
    { "image": "https://picsum.photos/200/200?random=39", "title": "Data Engineer" },
    { "image": "https://picsum.photos/200/200?random=40", "title": "System Analyst" },
    { "image": "https://picsum.photos/200/200?random=41", "title": "Technical Support" },
    { "image": "https://picsum.photos/200/200?random=42", "title": "Project Coordinator" },
    { "image": "https://picsum.photos/200/200?random=43", "title": "Digital Marketer" },
    { "image": "https://picsum.photos/200/200?random=44", "title": "Network Administrator" },
    { "image": "https://picsum.photos/200/200?random=45", "title": "Web Developer" },
    { "image": "https://picsum.photos/200/200?random=46", "title": "Artificial Intelligence Specialist" },
    { "image": "https://picsum.photos/200/200?random=47", "title": "Content Manager" },
    { "image": "https://picsum.photos/200/200?random=48", "title": "Product Analyst" },
    { "image": "https://picsum.photos/200/200?random=50", "title": "Digital Designer" },
    { "image": "https://picsum.photos/200/200?random=51", "title": "Security Specialist" },
    { "image": "https://picsum.photos/200/200?random=52", "title": "Database Developer" },
    { "image": "https://picsum.photos/200/200?random=53", "title": "IT Manager" },
    { "image": "https://picsum.photos/200/200?random=54", "title": "Software Tester" },
    { "image": "https://picsum.photos/200/200?random=55", "title": "Operations Analyst" },
    { "image": "https://picsum.photos/200/200?random=56", "title": "E-commerce Specialist" },
    { "image": "https://picsum.photos/200/200?random=57", "title": "Mobile Developer" },
    { "image": "https://picsum.photos/200/200?random=58", "title": "Creative Director" },
    { "image": "https://picsum.photos/200/200?random=59", "title": "Business Development Manager" },
    { "image": "https://picsum.photos/200/200?random=60", "title": "Cloud Engineer" },
    { "image": "https://picsum.photos/200/200?random=61", "title": "UX Researcher" },
    { "image": "https://picsum.photos/200/200?random=62", "title": "AI Engineer" },
    { "image": "https://picsum.photos/200/200?random=63", "title": "Social Media Manager" },
    { "image": "https://picsum.photos/200/200?random=64", "title": "Quality Analyst" },
    { "image": "https://picsum.photos/200/200?random=65", "title": "Hardware Engineer" },
    { "image": "https://picsum.photos/200/200?random=66", "title": "UX Designer" },
    { "image": "https://picsum.photos/200/200?random=67", "title": "Software Engineer" },
    { "image": "https://picsum.photos/200/200?random=68", "title": "Digital Strategist" },
    { "image": "https://picsum.photos/200/200?random=69", "title": "Technical Consultant" },
    { "image": "https://picsum.photos/200/200?random=70", "title": "Brand Manager" }
  ]
  title!: string;
  id:any;
  inquiries: any;
  inquiry: any;
  posts: any;
  post:any
  private destroy$ = new Subject<void>();

  constructor(public resize: ResizeService, private activatedRoute: ActivatedRoute, private http: HttpService, private router: Router) {
    this.activatedRoute.queryParams.subscribe((param: any) => {
      this.title = param?.title
      this.id = param?.id
      this.getInquiry()
    })
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  getInquiries() {
    this.http.loaderGet('Forum/get', false)
      .pipe(
        takeUntil(this.destroy$),
        finalize(()=>{
          this.getPosts()
        })
      )
      .subscribe((response) => {
        this.inquiries = response?.model?.forums
      })
  }
  getInquiry() {
    this.http.loaderGet(`Forum/get/${this.id}`, false)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this.getInquiries()
        })
      )
      .subscribe((response) => {
        this.inquiry = response?.model
      })
  }
  getPosts() {
    this.http.loaderGet(`Forum/get/${this.id}/post`, false)
      .pipe(
        takeUntil(this.destroy$),
        // finalize(() => {
        //   this.getInquiries()
        // })
      )
      .subscribe((response) => {
        console.log('====================================');
        console.log(response);
        console.log('====================================');
        this.posts = response?.model
      })
  }
  createPost() {
    const data ={
      forumId:this.id,
      title:this.post
    }
    this.http.loaderPost(`Forum/post/create`, data, false)
      .pipe(
        takeUntil(this.destroy$),
        // finalize(() => {
        //   this.getInquiries()
        // })
      )
      .subscribe((response) => {
        console.log('====================================');
        console.log(response);
        console.log('====================================');
        this.posts = response?.model
      })
  }
  routeToCommunity(id: any, title: string) {
    this.router.navigate(['/communities/community'], { queryParams: { id, title } });
  }
}
