import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePageComp } from './page/home/';
import { RepositoryComp } from './page/repository/';

const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: 'main',
    children: [
      { path: '', component: HomePageComp },
      { path: 'repositories/:username/:reponame', component: HomePageComp,
        children: [
          { path: '', component: RepositoryComp, outlet: 'repo' },
        ]
      },
    ]
  },
  { path: '**', redirectTo: 'main' }
]

let routerOptions = (process.env.NODE_ENV === 'development') ? { useHash: true } : {};

@NgModule({
  imports: [
    RouterModule.forRoot(routes, routerOptions),
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class RoutingModule {}

export const RoutingComp = [
  HomePageComp,
  RepositoryComp,
];
