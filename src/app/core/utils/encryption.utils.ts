import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import JSEncrypt from 'jsencrypt';

@Injectable({
  providedIn: 'root',
})
export class EncryptionUtils {
  encryptWithPublicKey(data: string): string | null {
    try {
      const encrypt = new JSEncrypt();
      encrypt.setPublicKey(environment.passwordPublicKey);
      return encrypt.encrypt(data) || null;
    } catch (error) {
      console.error('Encryption error:', error);
      return null;
    }
  }

  safeEncrypt(data: string): string {
    const encrypted = this.encryptWithPublicKey(data);
    return encrypted || data;
  }
}
