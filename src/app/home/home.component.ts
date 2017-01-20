import { Component } from '@angular/core'
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';


@Component({
    selector: "home",
    styleUrls: ['./home.component.css'],
    templateUrl: './home.component.html'
})
export class HomeComponent {

    constructor(private sanitizer: DomSanitizer) {
    }
}