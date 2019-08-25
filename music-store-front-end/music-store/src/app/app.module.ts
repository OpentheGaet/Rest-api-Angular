/*----------------------------- Basic stuff ---------------------------------------- */

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from 'src/app/auth/AuthGuard.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReverseStr } from './pipes/ReverseStr';

/*----------------------------- Models --------------------------------------------- */

import { ArtistsService } from './models/Artists/Artists.service';
import { StylesService } from './models/Styles/Styles.service';
import { AlbumsService } from './models/Albums/Albums.service';
import { CommentService } from './models/Comments/Comment.service';

/*---------------------------- Components ------------------------------------------ */

import { AppComponent } from './app.component';

/*--- Admin parts ---*/

import { AdminHeaderComponent } from './1-admin/1-template/1-header/admin-header.component';
import { AdminBodyComponent } from './1-admin/1-template/2-body/admin-body.compontent';
import { AdminFooterComponent } from './1-admin/1-template/3-footer/admin-footer.compontent';
import { AdminHomeComponent } from './1-admin/home/ad-home.component';
import { AdminAlbumComponent } from './1-admin/album/ad-album.component';
import { AdminAlbumsComponent } from './1-admin/albums/ad-albums.component';
import { AdminArtistsComponent } from './1-admin/artists/ad-artists.component';
import { AdminStylesComponent } from './1-admin/styles/ad-styles.component';
import { AdminCommentComponent } from './1-admin/comment/ad-comment.component';

/*--- Web parts ---*/

import { WebBodyComponent } from './2-web/1-template/2-body/web-body.compontent';
import { WebHeaderComponent } from './2-web/1-template/1-header/web-header.component';
import { WebFooterComponent } from './2-web/1-template/3-footer/web-footer.compontent';
import { HomeComponent } from './2-web/home/home.component';
import { IntroComponent } from './2-web/intro/intro.component';
import { AlbumsComponent } from './2-web/albums/albums.component';
import { StylesComponent } from './2-web/styles/styles.component';
import { ArtistsComponent } from './2-web/artists/artists.component';
import { AlbumComponent } from './2-web/album/album.component';
import { RegisterComponent } from './2-web/register/register.component';
import { AdminUserAdminComponent } from './1-admin/user-admin/user-admin.component';
import { AdminUserComponent } from './1-admin/user/user.component';
import { AdminConnectorComponent } from './2-web/admin-connector/admin-connector.component';
import { CommentComponent } from './2-web/comment/comment.component';
//import { SearchComponent } from './2-web/search/search.component';


/*------------------------------------ Routes -----------------------------------------------*/

const appRoutes = [

/*--- Routes for Admin --- */

  {
    path : '',
    component : AdminBodyComponent,
    children : [
      { path : '', redirectTo : '/home', pathMatch: 'full'},
      { path : 'admin/home', canActivate : [AuthGuard], component : AdminHomeComponent },
      { path : 'admin/albums', canActivate : [AuthGuard], component : AdminAlbumsComponent },
      { path : 'admin/album/:id', canActivate : [AuthGuard], component : AdminAlbumComponent },
      { path : 'admin/styles', canActivate : [AuthGuard], component : AdminStylesComponent },
      { path : 'admin/artists', canActivate : [AuthGuard], component : AdminArtistsComponent },
      { path : 'admin/comment', canActivate : [AuthGuard], component : AdminCommentComponent },
      { path : 'admin/user-admin', canActivate : [AuthGuard], component : AdminUserAdminComponent },
      { path : 'admin/user', canActivate : [AuthGuard], component : AdminUserComponent },
    ]
  },

/*--- Routes for web ---*/

  {
    path : '',
    component : WebBodyComponent,
    children : [
      { path : 'home', component : HomeComponent },
      { path : 'albums', component : AlbumsComponent },
      { path : 'album/:id', component : AlbumComponent },
      { path : 'styles', component : StylesComponent },
      { path : 'artists', component : ArtistsComponent },
      { path : 'register', component: RegisterComponent },
      { path : 'admin-connector', component: AdminConnectorComponent },
      //{ path : 'search', component : SearchComponent }
    ]
  },
  { path : '**', redirectTo : '/home'}
];

@NgModule({
  declarations: [
    AppComponent,

/*------------------ Component for admin ------------------*/

    AdminHeaderComponent,
    AdminBodyComponent,
    AdminFooterComponent,
    AdminHomeComponent,
    AdminAlbumsComponent,
    AdminAlbumComponent,
    AdminArtistsComponent,
    AdminStylesComponent,
    AdminCommentComponent,

/*------------------ Component for web --------------------*/

    WebHeaderComponent,
    WebBodyComponent,
    WebFooterComponent,
    HomeComponent,
    IntroComponent,
    AlbumsComponent,
    StylesComponent,
    ArtistsComponent,
    AlbumComponent,
    RegisterComponent,
    AdminUserAdminComponent,
    AdminUserComponent,
    AdminConnectorComponent,
    CommentComponent,
    //SearchComponent,

/*---------- Loading generics and custom stuffs ---------- */

    ReverseStr

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    AlbumsService,
    ArtistsService,
    StylesService,
    CommentService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
