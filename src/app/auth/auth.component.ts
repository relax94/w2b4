import { Component } from '@angular/core'
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { AuthService } from '../model/auth.service'
import { Subscription } from 'rxjs';

@Component({
    selector: "auth",
    styleUrls: ['./auth.component.css'],
    templateUrl: './auth.component.html'
})
export class AuthComponent {
    private fullBackVideo: SafeUrl;

    private subscription: any;

    private error: string;
    private errorSubscription: Subscription;

    constructor(private sanitizer: DomSanitizer, private auth: AuthService) {
        this.fullBackVideo = sanitizer.bypassSecurityTrustUrl('http://thenewcode.com/assets/videos/polina.mp4');

        this.subscription = this.auth.current$.subscribe(token => {
            console.log('auth current ', token);
        });

        this.errorSubscription = this.auth.error$.subscribe(error => console.log('err ', error));

    }

    loginMember(): void {
        this.auth.login('basket.pavlenko@gmail.com', '1111');
    }
}