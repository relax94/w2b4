import { Component } from '@angular/core'
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';


@Component({
    selector: "auth",
    styleUrls: ['./auth.component.css'],
    templateUrl: './auth.component.html'
})
export class AuthComponent {
    private fullBackVideo: SafeUrl;

    constructor(private sanitizer: DomSanitizer) {
        this.fullBackVideo = sanitizer.bypassSecurityTrustUrl('http://thenewcode.com/assets/videos/polina.mp4');
    }
}