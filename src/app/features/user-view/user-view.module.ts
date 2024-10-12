import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {ReactiveFormsModule} from "@angular/forms";
import {UserViewComponent} from "./components/user-view.component";
import {CommonModule} from "@angular/common";
import { UserTableComponent } from "./components/user-table/user-table.component";
import { UserTableFormService } from "./services/user-table-form.service";
import { StoreModule } from "@ngrx/store";
import { USER_VIEW_FEATURE_KEY, usersViewReducer } from "./+state/users-view.reducer";
import { EffectsModule } from "@ngrx/effects";
import * as userViewEffects from '../user-view/+state/users-view.effects';
import { HttpClientModule } from "@angular/common/http";

@NgModule({
    imports: [
        HttpClientModule,
        BrowserModule,
        ReactiveFormsModule,
        CommonModule,
        StoreModule.forFeature(USER_VIEW_FEATURE_KEY, usersViewReducer),
        EffectsModule.forFeature([userViewEffects])
    ],
    declarations: [
        UserViewComponent, UserTableComponent
    ],
    exports: [
        UserViewComponent
    ],
    providers: [UserTableFormService]
})
export class UserViewModule {
}
