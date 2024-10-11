import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {ReactiveFormsModule} from "@angular/forms";
import {UserViewComponent} from "./components/user-view.component";
import {CommonModule} from "@angular/common";
import { UserTableComponent } from "./components/user-table/user-table.component";

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        CommonModule
    ],
    declarations: [
        UserViewComponent, UserTableComponent
    ],
    exports: [
        UserViewComponent, UserTableComponent
    ]
})
export class UserViewModule {
}
