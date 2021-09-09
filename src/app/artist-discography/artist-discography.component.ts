import { Subscription } from 'rxjs';
import { MusicDataService } from './../music-data.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-artist-discography',
  templateUrl: './artist-discography.component.html',
  styleUrls: ['./artist-discography.component.css'],
})
export class ArtistDiscographyComponent implements OnInit, OnDestroy {
  albums: any;
  artist: any;
  private artistSub: Subscription;
  private albumsByArtistSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private mDService: MusicDataService
  ) {}

  ngOnInit(): void {
    let id = this.route.snapshot.params['id'];

    this.artistSub = this.mDService.getArtistById(id).subscribe(
      (next) => {
        this.artist = next;
      },
      (err) => {
        console.log(err);
      }
    );

    this.albumsByArtistSub = this.mDService.getAlbumsByArtistId(id).subscribe(
      (next) => {
        this.albums = next.items.filter(
          (item, index, arr) =>
            index ===
            arr.findIndex(
              (x) => x.name.toLowerCase() === item.name.toLowerCase()
            )
        );
      },
      (err) => {
        console.log(err);
      }
    );
  }

  ngOnDestroy(): void {
    this.albumsByArtistSub.unsubscribe();
    this.artistSub.unsubscribe();
  }
}
