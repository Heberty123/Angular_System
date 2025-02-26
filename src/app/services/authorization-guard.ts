import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "./auth-service";


export const AuthorizationGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const authService = inject(AuthService)
    const router = inject(Router)

    if (authService.isAuthenticated()) {
        const roles: string[] = route.data['roles']
        console.log(authService.currentUserSig())
        const role = authService.currentUserSig()!.role.name
        if (roles.includes(role)) {
            return true
        }
        else {
            return false
        }
    } 
    else {
        router.navigate(['/login'])
        return false
    }
}