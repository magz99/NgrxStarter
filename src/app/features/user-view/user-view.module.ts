import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {ReactiveFormsModule} from "@angular/forms";
import {UserViewComponent} from "./components/user-view.component";
import {CommonModule} from "@angular/common";

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        CommonModule
    ],
    declarations: [
        UserViewComponent
    ],
    exports: [
        UserViewComponent
    ]
})
export class UserViewModule {
}
