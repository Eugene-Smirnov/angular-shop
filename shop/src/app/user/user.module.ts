import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from './services/user.service';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UserInfoEffects } from '../redux/effects/user.effects';
import * as fromUserReducer from '../redux/reducers/user.reducer';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(fromUserReducer.userFeatureKey, fromUserReducer.userReducer),
    EffectsModule.forFeature([UserInfoEffects]),
  ],
  providers: [UserService],
})
export class UserModule {}
