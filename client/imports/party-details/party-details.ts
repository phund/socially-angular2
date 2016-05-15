import { Component } from '@angular/core';
import { RouteParams, RouterLink, CanActivate, ComponentInstruction } from '@angular/router-deprecated';
import { Parties } from '../../../collections/parties.ts';
import { FormBuilder, ControlGroup, Validators, Control } from '@angular/common';
import { Meteor } from 'meteor/meteor';
import { RequireUser } from 'angular2-meteor-accounts-ui';
import { MeteorComponent } from 'angular2-meteor';


@Component({
  selector: 'party-details',
  templateUrl: '/client/imports/party-details/party-details.html',
  directives: [RouterLink]
})
@RequireUser()

export class PartyDetails extends MeteorComponent {
  party: Party;
  partyForm: ControlGroup;
 
  constructor(params: RouteParams) {
    super();
    let partyId = params.get('partyId');
    let fb = new FormBuilder();

    this.subscribe('party', partyId, () => {
      this.party = Parties.findOne(partyId);
    }, true);

    this.partyForm = fb.group({
      _id: [partyId],
      name: ['', Validators.required],
      description: [''],
      location: ['', Validators.required]
    });
  }

  saveParty(party) {
    if (Meteor.userId()) {
      Parties.update(party._id, {
        $set: {
          name: party.name,
          description: party.description,
          location: party.location
        }
      });
    } else {
      alert('Please log in to change this party');
    }
  }
}