import { Component, ComponentFactoryResolver, Injector, Input } from '@angular/core';
import { ModalService } from '../../../../../modal/modal.service';
import { CardConfirmModalComponent } from './card-confirm-modal/card-confirm-modal.component';
import { IProduct } from '../../../../../store/reducers/products.reducer';
import { Store } from '@ngrx/store';
import { IStore } from '../../../../../store';
import { AddProductToCart } from '../../../../../store/actions/cart.actions';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent {
  @Input()
  public product!: IProduct;

  @Input()
  public isOdd!: boolean;

  public constructor(
    private readonly modalService: ModalService,
    private readonly cfr: ComponentFactoryResolver,
    private readonly store: Store<IStore>
  ) {
  }

  public toggleFavorite(): void {
    this.product.isFavorite = !this.product.isFavorite;
  }

  public addToCart(product: IProduct): void {
    this.modalService.open({
      component: CardConfirmModalComponent,
      resolver: this.cfr,
      context: {
        product: {...product},
        save: () => {
          console.log('Save');
          this.store.dispatch(new AddProductToCart(product));
          this.modalService.close();
        },
        close: () => {
          console.log('Close');
          this.modalService.close();
        }
      }
    });
  }
}
