import { Component } from '@angular/core'
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';


@Component({
    selector: "home",
    styleUrls: ['./home.component.css'],
    templateUrl: './home.component.html'
})
export class HomeComponent {
    private fullBackVideo: SafeUrl;

    constructor(private sanitizer: DomSanitizer) {
        this.fullBackVideo = sanitizer.bypassSecurityTrustUrl('http://thenewcode.com/assets/videos/polina.mp4');
    }



}