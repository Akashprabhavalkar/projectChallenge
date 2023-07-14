import { Component, OnInit } from '@angular/core';
// import { signUp } from '../data-type';
import { UserService } from '../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit {
  match: any;
  betSlipOptions: any[] = [];
  selectedBetSlipOption?: string;
  legs: any;
  selectedLeg: any;
  legId: any;
  MarketId: any
  MatchId: any
  betBuilderBets: any = []
  constructor(private user: UserService, private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    this.match = history.state.match;
    console.warn(this.match);
    this.MatchId = this.match.MatchId
    this.fetchBetSlipOptions();
    this.selectLegs()

  }
  fetchBetSlipOptions() {
    const apiUrl = 'http://cms.bettorlogic.com/api/BetBuilder/GetMarkets?sports=1';
    this.http.get<any[]>(apiUrl).subscribe((data) => {

      this.betSlipOptions = data;
      console.log("this.betSlipOptions", this.betSlipOptions);

    });
  }
  selectLegs() {
    const apiUrl = '  http://cms.bettorlogic.com/api/BetBuilder/GetSelections?sports=1';
    this.http.get<any[]>(apiUrl).subscribe((data) => {
      this.legs = data;
    });
  }
  BetBuilderBets() {
    const apiUrl = `  http://cms.bettorlogic.com/api/BetBuilder/GetBetBuilderBets?sports=1&matchId=${this.MatchId}&marketId=${this.MarketId}&legs=${this.legId}&language=en
  `;
    this.http.get<any>(apiUrl).subscribe((data) => {
      console.log("BetBuilderBets", data.BetBuilderSelections);

      this.betBuilderBets = data.BetBuilderSelections


    });
  }

  signUp(data: any) {
    this.user.userSignUP(data)
  }
  slipChange(MarketId: any) {
    console.log(MarketId);
    this.MarketId = MarketId
  }
  legChange(selectionId: any) {
    console.log(selectionId)
    this.legId = selectionId;
    this.BetBuilderBets()


  }


}