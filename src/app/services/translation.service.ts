import { Injectable } from '@angular/core';
import { FA_TRANSLATIONS } from '../fa';
@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private translation: { [key: string]: string } = FA_TRANSLATIONS;


  translate(key: string): string{
    const cleanKey = key.startsWith('@') ? key.substring(1) : key;
    return this.translation[`@${cleanKey}`] || key;
  }
  getTranslation(): { [key: string]: string } {
    return this.translation
  }

}
