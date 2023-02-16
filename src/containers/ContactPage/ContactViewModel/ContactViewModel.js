/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import ContactDetailViewModel from './ContactDetailViewModel';
import ContactListViewModel from './ContactListViewModel';

class ContactViewModel {
  contactDetailViewModel = null;
  contactListViewModel = null;

  constructor(contactStore) {
    if (contactStore) {
      this.contactDetailViewModel = new ContactDetailViewModel(contactStore);
      this.contactListViewModel = new ContactListViewModel(contactStore);
    }
  }

  getContactDetailViewModel = () => this.contactDetailViewModel;
  getContactListViewModel = () => this.contactListViewModel;
}

export default ContactViewModel;
