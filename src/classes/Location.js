import { QS } from './qs';

export class Location {
  static handled = false;

  static get path() {
    return location.pathname;
  }

  static search = QS.parse(location.search);
}