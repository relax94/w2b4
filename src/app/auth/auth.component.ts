import { Component } from '@angular/core'
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { AuthService } from '../model/auth.service'
import { Subscription } from 'rxjs';
import { Router } from '@angular/router'

@Component({
    selector: "auth",
    styleUrls: ['./auth.component.css'],
    templateUrl: './auth.component.html'
})
export class AuthComponent {
    private fullBackVideo: SafeUrl;

    private subscription: any;
    private isProgressActivated: boolean = false;

    private error: string;
    private errorSubscription: Subscription;

    constructor(private sanitizer: DomSanitizer, private auth: AuthService, private router: Router) {
        this.fullBackVideo = sanitizer.bypassSecurityTrustUrl('http://thenewcode.com/assets/videos/polina.mp4');

        this.subscription = this.auth.current$.subscribe(this.handleCurrentSubscription.bind(this));
        this.errorSubscription = this.auth.error$.subscribe(this.handleErrorSubscription.bind(this));
    }

    loginMember(): void {
        this.activateAuthenticationProgress();
        this.auth.login('basket.pavlenko@gmail.com', '1111');
    }

    activateAuthenticationProgress(): void {
        this.error = "";
        this.isProgressActivated = true;
    }

    deactivateAuthenticationProgress(): void {
        this.isProgressActivated = false;
    }

    handleCurrentSubscription(token: string): void {
        if (token) {
            this.router.navigateByUrl('/home');
        }
    }

    handleErrorSubscription(error: string): void {
        this.error = error;
        this.deactivateAuthenticationProgress();
    }

}
