import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name : 'reverseStr'})
export class ReverseStr implements PipeTransform {
  transform(value : string) : string {
    let newStr : string = '';
    for (let i = value.length; i >= 0; i--) {
      newStr += value.charAt(i);
    }
    return newStr;
  }
}
