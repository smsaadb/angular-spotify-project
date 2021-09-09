import { Subscription } from 'rxjs';
import { MusicDataService } from './../music-data.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css'],
})
export class SearchResultComponent implements OnInit, OnDestroy {
  results: any;
  searchQuery: any;

  private searchSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private mDService: MusicDataService
  ) {}

  ngOnInit(): void {
    this.searchSub = this.route.queryParams.subscribe((params) => {
      this.searchQuery = params['q'];
      this.searchSub = this.mDService
        .searchArtists(this.searchQuery)
        .subscribe((next) => {
          this.results = next.artists.items.filter((item) => {
            if (item.images.length > 0) {
              return true;
            } else {
              return false;
            }
          });
        });
    });
  }

  ngOnDestroy(): void {
    this.searchSub.unsubscribe();
  }
}
