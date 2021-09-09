import { Subscription } from 'rxjs';
import { MusicDataService } from './../music-data.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-new-releases',
  templateUrl: './new-releases.component.html',
  styleUrls: ['./new-releases.component.css'],
})
export class NewReleasesComponent implements OnInit, OnDestroy {
  releases: any;
  private newRelSub: Subscription;

  constructor(private mDService: MusicDataService) {}

  ngOnInit(): void {
    this.newRelSub = this.mDService.getNewReleases().subscribe(
      (next) => {
        this.releases = next.albums.items;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getRelDate(d: string): string {
    let date: Date = new Date(d);
    return date.toLocaleDateString();
  }

  ngOnDestroy(): void {
    this.newRelSub.unsubscribe();
  }
}
