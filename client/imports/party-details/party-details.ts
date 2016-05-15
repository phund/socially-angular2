import { Component } from '@angular/core';
import { RouteParams } from '@angular/router-deprecated';
import { Parties } from '../../../collections/parties.ts';
import { RouterLink }  from '@angular/router-deprecated';
 
@Component({
  selector: 'party-details',
  templateUrl: '/client/imports/party-details/party-details.html',
  directives: [RouterLink]
})
export class PartyDetails {
  party: Object;
 
  constructor(params: RouteParams) {
    var partyId = params.get('partyId');
    this.party = Parties.findOne(partyId);
    console.log(this.party);
  }
}