import { History } from './History';
import { Location } from './Location';

export class Route {

  constructor(forceUpdate, path, output) {
    this.forceUpdate = forceUpdate;
    this.matchtest = typeof path === 'string' ? new RegExp(path) : path;
    this.output = output;

    this.handleUpdate = this.handleUpdate.bind(this);
    this.unsubscribeFromUpdateEvent = this.unsubscribeFromUpdateEvent.bind(this);
    this.handleUpdateEventSubscription = this.handleUpdateEventSubscription.bind(this);
  }

  test() {
    const { pathname, search } = location;
    if (this.result === undefined) {
      if (this.path === pathname) return false;
    } else if (this.path === pathname
      && this.search === search) return false;
    this.path = pathname;

    const { 0: match, groups: params } = this.matchtest.exec(pathname) || {};
    if (this.match === match && this.search === search) return false;
    this.match = match;
    this.search = search;

    if (match === undefined) this.result = undefined;
    else {
      Location.handled = true;
      const props = { ...params, ...Location.search };
      if (this.output === undefined) this.result = props;
      else this.result = typeof this.output === 'function'
        ? this.output(props)
        : this.output;
    }

    return true;
  }

  handleUpdate() {
    if (this.test()) this.forceUpdate();
  }

  subscribeToUpdateEvent() {
    this.updateSub = History.updateEvent.subscribe(this.handleUpdate);
  }

  unsubscribeFromUpdateEvent() {
    this.updateSub.unsubscribe();
  }

  handleUpdateEventSubscription() {
    this.subscribeToUpdateEvent();
    return this.unsubscribeFromUpdateEvent;
  }
}