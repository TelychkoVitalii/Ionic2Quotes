import { Component } from '@angular/core';
import { AlertController, NavController, NavParams } from 'ionic-angular';
import { Quote } from "../../data/quote.interface";
import { QuotesService } from "../../services/quotes";

@Component({
  selector: 'page-quotes',
  templateUrl: 'quotes.html',
})
export class QuotesPage {
  quoteGroup: {category: string, quotes: Quote[], icon: string}[];
  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, private qs: QuotesService) {}

  ngOnInit() {
    this.quoteGroup = this.navParams.data;
  }

  AddToFavourite(selectedQuote: Quote) {
    const alert = this.alertCtrl.create({
        title: 'Add Quote',
        subTitle: 'Are you sure?',
        message: 'Are you sure you want to add a quote?',
        buttons: [{
          text: 'Yes, go ahead',
          handler: () => {
            this.qs.AddToFavourite(selectedQuote);
          }
          },
          {
            text: 'No, I changed my mind',
            role: 'cancel',
            handler: () => {
              console.log('cancel');
            },
        }]
    });

    alert.present();
  }
  // ionViewDidLoad() {
  //   this.quoteGroup = this.navParams.data;
  // but we need elvis(?) operator
  // }

  RemoveFromFavourite(quote: Quote) {
    this.qs.removeQuoteFromFavourites(quote);
  }

  isFavourite(quote: Quote) {
    return this.qs.isQuoteFavourite(quote);
  }
}
