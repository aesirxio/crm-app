/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import EmailDetailViewModel from './EmailDetailViewModel';
import EmailListViewModel from './EmailListViewModel';

class EmailViewModel {
  emailDetailViewModel = null;
  emailListViewModel = null;

  constructor(emailStore) {
    if (emailStore) {
      this.emailDetailViewModel = new EmailDetailViewModel(emailStore);
      this.emailListViewModel = new EmailListViewModel(emailStore);
    }
  }

  getEmailDetailViewModel = () => this.emailDetailViewModel;
  getEmailListViewModel = () => this.emailListViewModel;
}

export default EmailViewModel;
