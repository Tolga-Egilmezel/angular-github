import { ViewEncapsulation, Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiServ } from '../../service/index'; // API Service

/*
Home Component
==========
ngInit: call getRepositories function
getRepositories: Get repotories from api service
*/

@Component({
  selector: 'div[outline][home]',
  styleUrls: ['./home.scss'],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './home.html',
  providers: [
    ApiServ
  ],
})

export class HomePageComp implements OnInit {
  localLoader: boolean = false;
  private result: any = [];
  private onError: string = '';
  private param: any = {
    username: 'heremaps',
    reponame: '',
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiServ,
  ) {}

  getRepositories() {
    this.localLoader = true;
    this.onError = '';
    this.apiService.getRepositories(this.param)
      .subscribe( resultRepositories => {
        this.result = resultRepositories;
      }, resultError => {
        this.onError = resultError._body;
      })
  }

  ngOnInit() {
    this.getRepositories();
  }
}
