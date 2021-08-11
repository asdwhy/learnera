import { Pipe, PipeTransform } from '@angular/core';
import { Address } from 'src/app/classes/interfaces/address';

@Pipe({
  name: 'address'
})
export class AddressPipe implements PipeTransform {

  transform(value: Address): string {

    var ret = "";
    ret = value.line1 ? value.line1 : ret;
    ret = value.city ? `${ret}, ${value.city}` : ret;
    ret = value.province ? `${ret}, ${value.province}` : ret;
    ret = value.postalCode? `${ret}, ${value.postalCode}` : ret;
    ret = value.country? `${ret}, ${value.country}` : ret;
    return ret;
  }
}
