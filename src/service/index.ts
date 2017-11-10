import { Injectable } from '@angular/core'
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

/*
API Service
===========
All api services
getRepositories: Get Repositories from API
params: username
getRepository: Get Single Repository
params: username, reponame
*/


@Injectable()
export class ApiServ {
  private api_url: string = " https://api.github.com";

  constructor(
    public http: Http,
  ) {}

  getRepositories(param) {
    return this.http.get(`${this.api_url}/users/${param.username}/repos`)
      .map((response: Response) => response.json())
      .catch(this.errorHandler);
  }

  getRepository(param) {
    return this.http.get(`${this.api_url}/repos/${param.username}/${param.reponame}/languages`)
      .map((response: Response) => response.json())
      .catch(this.errorHandler);
  }

  errorHandler(error: Response){
    console.error(error);
    return Observable.throw(error || "Server Error");
  }
}
