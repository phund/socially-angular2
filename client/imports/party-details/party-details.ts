import { Component } from '@angular/core';
import { RouteParams, RouterLink } from '@angular/router-deprecated';
import { Parties } from '../../../collections/parties.ts';
import { FormBuilder, ControlGroup, Validators, Control } from '@angular/common';
 
@Component({
  selector: 'party-details',
  templateUrl: '/client/imports/party-details/party-details.html',
  directives: [RouterLink]
})
export class PartyDetails {
  party: Object;
 
  constructor(params: RouteParams) {
    let partyId = params.get('partyId');
    let fb = new FormBuilder();

    this.party = Parties.findOne(partyId);
    console.log(this.party);

    this.partyForm = fb.group({
      _id: [partyId],
      name: ['', Validators.required],
      description: [''],
      location: ['', Validators.required]
    });
  }

  saveParty(party) {
    console.log("save");
    console.log(party);  
    let pateyId = Parties.update(party._id, {
      $set: {
        name: party.name,
        description: party.description,
        location: party.location
      }
    });
  }
}