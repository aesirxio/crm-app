/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import ContactGroupDetailViewModel from './ContactGroupDetailViewModel';
import ContactGroupListViewModel from './ContactGroupListViewModel';

class ContactGroupViewModel {
  contactGroupDetailViewModel = null;
  contactGroupListViewModel = null;

  constructor(contactGroupStore) {
    if (contactGroupStore) {
      this.contactGroupDetailViewModel = new ContactGroupDetailViewModel(contactGroupStore);
      this.contactGroupListViewModel = new ContactGroupListViewModel(contactGroupStore);
    }
  }

  getContactGroupDetailViewModel = () => this.contactGroupDetailViewModel;
  getContactGroupListViewModel = () => this.contactGroupListViewModel;
}

export default ContactGroupViewModel;
