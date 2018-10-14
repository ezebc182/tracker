/* import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js'

@Injectable()
export class EncryptionProvider {
  constructor() {}
  
  encrypt(data, key) {
    const CryptoJSAesJson = {
      stringify: function (cipherParams) {
        const j = { ct: cipherParams.ciphertext.toString(CryptoJS.enc.Base64) }
        if (cipherParams.iv) {
          j['iv'] = cipherParams.iv.toString()
        }
        if (cipherParams.salt) {
          j['s'] = cipherParams.salt.toString()
        }
        return JSON.stringify(j)
      },
      parse: function (jsonStr) {
        const j = JSON.parse(jsonStr)
        const cipherParams = CryptoJS.AES.CipherParams.create({ ciphertext: CryptoJS.enc.Base64.parse(j.ct) })
        if (j.iv) {
          cipherParams.iv = CryptoJS.enc.Hex.parse(j.iv)
        }
        if (j.s) {
          cipherParams.salt = CryptoJS.enc.Hex.parse(j.s)
        }
        return cipherParams
      }
    }

    if (typeof data === 'object') {
      data = JSON.stringify(data)
    }

    return CryptoJS.AES.encrypt(data, key, { format: CryptoJSAesJson }).toString()
  }

  decrypt(data, key) {
    const CryptoJSAesJson = {
      stringify: function (cipherParams) {
        const j = { ct: cipherParams.ciphertext.toString(CryptoJS.enc.Base64) }
        if (cipherParams.iv) {
          j['iv'] = cipherParams.iv.toString()
        }
        if (cipherParams.salt) {
          j['s'] = cipherParams.salt.toString()
        }
        return JSON.stringify(j)
      },
      parse: function (jsonStr) {
        const j = JSON.parse(jsonStr)
        const cipherParams = CryptoJS.lib.CipherParams.create({ ciphertext: CryptoJS.enc.Base64.parse(j.ct) })
        if (j.iv) {
          cipherParams.iv = CryptoJS.enc.Hex.parse(j.iv)
        }
        if (j.s) {
          cipherParams.salt = CryptoJS.enc.Hex.parse(j.s)
        }
        return cipherParams
      }
    }

    return CryptoJS.AES.decrypt(data, key, { format: CryptoJSAesJson }).toString(CryptoJS.enc.Utf8)
  }

}
 */