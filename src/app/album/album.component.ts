import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MusicDataService } from './../music-data.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css'],
})
export class AlbumComponent implements OnInit, OnDestroy {
  album: any;
  private albumByIdSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private mDService: MusicDataService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    let id = this.route.snapshot.params['id'];
    this.albumByIdSub = this.mDService.getAlbumById(id).subscribe((next) => {
      this.album = next;
    });
  }

  addToFavourites(trackID): void {
    this.mDService.addToFavourites(trackID).subscribe(
      () => {
        this.snackBar.open('Adding to Favourites...', 'Done', {
          duration: 1500,
        });
      },
      (err) => {
        this.snackBar.open('Unable to add song to Favourites', 'Done', {
          duration: 1500,
        });
      }
    );
  }

  ngOnDestroy(): void {
    this.albumByIdSub.unsubscribe();
  }
}
