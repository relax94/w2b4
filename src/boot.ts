

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app';


import 'bootstrap-loader';
import 'jquery';       
import 'chart.js'


platformBrowserDynamic().bootstrapModule(AppModule)


