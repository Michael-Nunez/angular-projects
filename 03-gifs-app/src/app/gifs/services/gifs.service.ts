import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment';
import type { GiphyResponse } from '../interfaces/giphy.interfaces';
import type { Gif } from '../interfaces/gif.interface';
import { GifMapper } from '../mapper/gif.mapper';
import { map, tap } from 'rxjs';

const GIF_KEY = 'gifs';

const loadFromLocalStorage = () => {
  const gifsFromLocalStorage = localStorage.getItem(GIF_KEY) ?? '{}';
  const gifs = JSON.parse(gifsFromLocalStorage);

  return gifs;
}

@Injectable({ providedIn: 'root' })
export class GifService {
  private http = inject(HttpClient);

  private trendingPage = signal(0);
  trendingGifs = signal<Gif[]>([]);
  trendingGifsLoading = signal(false);

  trendingGifGroup = computed<Gif[][]>(() => {
    const groups: Gif[][] = [];

    for (let index = 0; index < this.trendingGifs().length; index += 3) {
      groups.push(this.trendingGifs().slice(index, index + 3));
    }

    return groups;
  });

  searchHistory = signal<Record<string, Gif[]>>(loadFromLocalStorage());
  searchHistoryKeys = computed(() => Object.keys(this.searchHistory()));

  constructor() {
    this.loadTrendingGifs();
  }

  saveGifsToLocalStorage = effect(() => {
    const historyString = JSON.stringify(this.searchHistory());
    localStorage.setItem(GIF_KEY, historyString);
  });

  loadTrendingGifs() {
    if (this.trendingGifsLoading()) return;

    this.trendingGifsLoading.set(true);

    this.http.get<GiphyResponse>(`${environment.giphyURL}/gifs/trending`,
      {
        params: {
          api_key: environment.giphyAPIKey,
          limit: 20,
          offset: this.trendingPage() * 20
        }
      }
    ).subscribe((response) => {
      const gifs = GifMapper.mapGiphyItemsToGifArray(response.data);
      this.trendingGifs.update((currentGifs) => [...currentGifs, ...gifs]);
      this.trendingPage.update((currentPage) => currentPage + 1);
      this.trendingGifsLoading.set(false);
    });
  }

  searchGif(query: string) {
    return this.http.get<GiphyResponse>(`${environment.giphyURL}/gifs/search`,
      {
        params: {
          api_key: environment.giphyAPIKey,
          q: query,
          limit: 20
        }
      }
    ).pipe(
      map(({ data }) => data),
      map((items) => GifMapper.mapGiphyItemsToGifArray(items)),
      tap((items) => {
        this.searchHistory.update((history) => ({
          ...history,
          [query.toLowerCase()]: items
        }));
      })
    );
  }

  getHistoryGifs(query: string): Gif[] {
    return this.searchHistory()[query] ?? [];
  }
}