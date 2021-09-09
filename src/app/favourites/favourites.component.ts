import { Subscription } from 'rxjs';
import { MusicDataService } from './../music-data.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css'],
})
export class FavouritesComponent implements OnInit, OnDestroy {
  favourites: Array<any>;
  private favSub: Subscription;

  constructor(private mDService: MusicDataService) {}

  ngOnInit(): void {
    this.favSub = this.mDService.getFavourites().subscribe((next) => {
      this.favourites = next.tracks;
    });
  }

  removeFromFavourites(id): void {
    this.mDService.removeFromFavourites(id).subscribe((next) => {
      this.favourites = next.tracks;
    });
  }

  ngOnDestroy(): void {
    this.favSub.unsubscribe();
  }
}
