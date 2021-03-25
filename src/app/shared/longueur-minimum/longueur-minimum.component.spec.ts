import { AbstractControl } from "@angular/forms";
import { ZonesValidator } from "./longueur-minimum.component";

describe('longueur zone Validator', () => {
    
    it('#7 | une chaîne avec 10 espaces est invalide', () =>{
        // Préparer une variable pour manipuler le validateur
        let validator = ZonesValidator.longueurMinimum(3);
        let control = { value: ' '.repeat(10)};
        // Faire l'appel du validateur
        let result = validator(control as AbstractControl);
        //Comparer le résultat OBTENU avec le résultat PRÉVU
        expect(result['nbreCaracteresInsuffisants']).toBe(true);
    });

    it('#8 | Une phrase avec des mots est valide', () =>{
        // Préparer une variable pour manipuler le validateur
        let validator = ZonesValidator.longueurMinimum(3);
        let control = { value: 'Vive angular'};
        // Faire l'appel du validateur
        let result = validator(control as AbstractControl);
        //Comparer le résultat OBTENU avec le résultat PRÉVU
        expect(result).toBeNull();
    });

    it('#9 | Une phrase avec 3 espaces, des mots et ensuite 3 espaces est valide', () =>{
        // Préparer une variable pour manipuler le validateur
        let validator = ZonesValidator.longueurMinimum(3);
        let control = { value: '   je le veux   '};
        // Faire l'appel du validateur
        let result = validator(control as AbstractControl);
        //Comparer le résultat OBTENU avec le résultat PRÉVU
        expect(result).toBeNull();
    });

    it('#10 | Une phrase avec 1 espace et 2 caractères est invalide', () =>{
        // Préparer une variable pour manipuler le validateur
        let validator = ZonesValidator.longueurMinimum(3);
        let control = { value: ' xx'};
        // Faire l'appel du validateur
        let result = validator(control as AbstractControl);
        //Comparer le résultat OBTENU avec le résultat PRÉVU
        expect(result['nbreCaracteresInsuffisants']).toBe(true);
    });

    it('#11 | Une phrase avec 2 espaces et 1 caractère est invalide', () =>{
        // Préparer une variable pour manipuler le validateur
        let validator = ZonesValidator.longueurMinimum(3);
        let control = { value: '  x'};
        // Faire l'appel du validateur
        let result = validator(control as AbstractControl);
        //Comparer le résultat OBTENU avec le résultat PRÉVU
        expect(result['nbreCaracteresInsuffisants']).toBe(true);
    });

    it('#12 | Une phrase avec 3 espaces et 3 caractères est valide', () =>{
        // Préparer une variable pour manipuler le validateur
        let validator = ZonesValidator.longueurMinimum(3);
        let control = { value: '   xxx'};
        // Faire l'appel du validateur
        let result = validator(control as AbstractControl);
        //Comparer le résultat OBTENU avec le résultat PRÉVU
        expect(result).toBeNull();
    });

    it('#13 | Une phrase avec 5 espaces, 5 caractères et 5 espaces est valide', () =>{
        // Préparer une variable pour manipuler le validateur
        let validator = ZonesValidator.longueurMinimum(3);
        let control = { value: '     xxxxx'};
        // Faire l'appel du validateur
        let result = validator(control as AbstractControl);
        //Comparer le résultat OBTENU avec le résultat PRÉVU
        expect(result).toBeNull();
    });

    it('#14 | Une chaîne nulle est invalide', () =>{
        // Préparer une variable pour manipuler le validateur
        let validator = ZonesValidator.longueurMinimum(3);
        let control = { value: null};
        // Faire l'appel du validateur
        let result = validator(control as AbstractControl);
        //Comparer le résultat OBTENU avec le résultat PRÉVU
        expect(result['nbreCaracteresInsuffisants']).toBe(true);
    });

});