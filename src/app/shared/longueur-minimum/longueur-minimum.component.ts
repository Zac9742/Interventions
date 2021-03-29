import { AbstractControl, ValidatorFn } from "@angular/forms";

export class ZonesValidator {
    static longueurMinimum(longueur: number): ValidatorFn {
        // Sous ANGULAR dans les validateurs pour indiquer un succès retourner NULL autrement retourner une clé valeur JSON
        return (controle: AbstractControl): { [key: string]: boolean} | null => {
            if (controle.value == null || controle.value.trim().isEmpty){
                return { 'nbreCaracteresInsuffisants': true };
            }
            if (controle.value.trim().length >= longueur) {
                return null;
            }
            return { 'nbreCaracteresInsuffisants': true };
        };
    }
    static longueurMaximum(longueur: number): ValidatorFn {
        // Sous ANGULAR dans les validateurs pour indiquer un succès retourner NULL autrement retourner une clé valeur JSON
        return (controle: AbstractControl): { [key: string]: boolean} | null => {
            if (controle.value == null || controle.value.trim().isEmpty){
                return { 'nbreCaracteresDepasse': true };
            }
            if (controle.value.trim().length <= longueur) {
                return null;
            }
            return { 'nbreCaracteresInsuffisants': true };
        };
    }
}