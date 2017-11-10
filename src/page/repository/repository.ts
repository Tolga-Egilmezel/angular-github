/*
Repository Component
==========
Outlet to outlet name details

ngInit: call getRepository function
getRepository: Get repotoriy from api service
generateResult: Object to Array for ngFor
*/

import { ViewEncapsulation, Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ApiServ } from '../../service/index'; // API Service

@Component({
  selector: 'div.details',
  styleUrls: ['./repository.scss'],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './repository.html',
  providers: [
    ApiServ
  ],
})

export class RepositoryComp implements OnInit {
  localLoader: boolean = false;
  private result: any = {
    "HTML": 7994,
    "CSS": 6273
  };
  private param: any = {
    username: '',
    reponame: '',
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiServ,
  ) {}

  generateResult(arr) {
    let result = [];
    for( var i in arr ) {
        if (arr.hasOwnProperty(i)){
           result.push({name: i, code: arr[i]});
        }
    }
    return result;
  }

  getRepository() {
    this.localLoader = true;
    this.apiService.getRepository(this.param)
      .subscribe( resultRepository => {
        this.result = this.generateResult(resultRepository);
      })
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      let username = params['username'];
      let reponame = params['reponame'];
      this.param = {
        username: username,
        reponame: reponame
      };
    });

    this.getRepository();
  }

}
