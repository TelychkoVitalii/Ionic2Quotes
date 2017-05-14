import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';

import { QuotesService } from "../../services/quotes";
import { SettingsService } from "../../services/settings";
import { Quote } from "../../data/quote.interface";
import { QuotePage } from "../quote/quote";

@Component({
  selector: 'page-favourites',
  templateUrl: 'favourites.html',
})
export class FavouritesPage {
  quotes: Quote[];
  
  constructor(public navCtrl: NavController, public navParams: NavParams,
              private qs: QuotesService, private modalCtrl: ModalController,
              private settingsService: SettingsService ) {}

  ionViewWillEnter() {
    this.quotes = this.qs.getFavouriteQuotes();
  }

  onViewQuote(quote: Quote) {
    const modal = this.modalCtrl.create(QuotePage, quote);
    modal.present();
    modal.onDidDismiss((remove: boolean) => {
      if(remove) {
        this.RemoveFromFavourite(quote);
      }
    })
  }

  RemoveFromFavourite(quote: Quote) {
    this.qs.removeQuoteFromFavourites(quote);
    // this.quotes = this.qs.getFavouriteQuotes(); // update favourite page
    const position = this.quotes.findIndex((quoteEl: Quote) => {
      return quoteEl.id === quote.id;
    });
    this.quotes.splice(position, 1);
  }

  getBackground() {
    return this.settingsService.isAltBackground() ? 'altQuoteBackground' : 'quoteBackground';
  }
}
