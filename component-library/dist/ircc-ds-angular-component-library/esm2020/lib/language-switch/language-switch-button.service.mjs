import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as i0 from "@angular/core";
export class LanguageSwitchButtonService {
    constructor() {
        this.languageClickSub = new BehaviorSubject('');
        this.languageClickObs$ = this.languageClickSub.asObservable();
    }
    languageToggleClick() {
        this.languageClickSub.next(true);
    }
}
LanguageSwitchButtonService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.1.3", ngImport: i0, type: LanguageSwitchButtonService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
LanguageSwitchButtonService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.1.3", ngImport: i0, type: LanguageSwitchButtonService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.1.3", ngImport: i0, type: LanguageSwitchButtonService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGFuZ3VhZ2Utc3dpdGNoLWJ1dHRvbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vY29tcG9uZW50LWxpYi9zcmMvbGliL2xhbmd1YWdlLXN3aXRjaC9sYW5ndWFnZS1zd2l0Y2gtYnV0dG9uLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sTUFBTSxDQUFDOztBQUt2QyxNQUFNLE9BQU8sMkJBQTJCO0lBSHhDO1FBSVUscUJBQWdCLEdBQUcsSUFBSSxlQUFlLENBQU0sRUFBRSxDQUFDLENBQUM7UUFDeEQsc0JBQWlCLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFlBQVksRUFBRSxDQUFDO0tBSzFEO0lBSEMsbUJBQW1CO1FBQ2pCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbkMsQ0FBQzs7d0hBTlUsMkJBQTJCOzRIQUEzQiwyQkFBMkIsY0FGMUIsTUFBTTsyRkFFUCwyQkFBMkI7a0JBSHZDLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIExhbmd1YWdlU3dpdGNoQnV0dG9uU2VydmljZSB7XG4gIHByaXZhdGUgbGFuZ3VhZ2VDbGlja1N1YiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8YW55PignJyk7XG4gIGxhbmd1YWdlQ2xpY2tPYnMkID0gdGhpcy5sYW5ndWFnZUNsaWNrU3ViLmFzT2JzZXJ2YWJsZSgpO1xuXG4gIGxhbmd1YWdlVG9nZ2xlQ2xpY2soKSB7XG4gICAgdGhpcy5sYW5ndWFnZUNsaWNrU3ViLm5leHQodHJ1ZSk7XG4gIH1cbn1cbiJdfQ==