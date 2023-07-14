import { Component, OnInit } from '@angular/core';
// import { product } from '../data-type';
import { ProductService } from '../services/product.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'ang';
  matches?: any[];
  todayMatches: any;
  data: any
  dates: Date[] = [];
  selectedDate?: Date;

  constructor(private product: ProductService, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.http.get<any>('http://cms.bettorlogic.com/api/BetBuilder/GetFixtures?sports=1').subscribe(data => {
      console.log(data)
      this.data = data;
    });
    this.generateDates();
  }

  generateDates() {
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(today.getDate() + i);
      this.dates.push(date);
    }
    this.selectedDate = this.dates[0];
  }
  onSelectDate(date: Date) {
    this.selectedDate = date;
  }
  getMatchesByDate(date: Date) {
    return this.data.filter((item: { KickOffUtc: string | number | Date; }) => new Date(item.KickOffUtc).toLocaleDateString('en-US') === date.toLocaleDateString('en-US'));
  }
  redirectToMatchDetails(match: any) {
    this.router.navigate(['user-auth'], { state: { match } });
  }

}
