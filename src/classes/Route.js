import { Router } from './Router';

export class Route {

  constructor(forceUpdate, path, output) {
    this.forceUpdate = forceUpdate;
    this.matchtest = new RegExp(path);
    this.output = output;

    this.handleUpdate = this.handleUpdate.bind(this);
    this.unsubscribeFromUpdateEvent = this.unsubscribeFromUpdateEvent.bind(this);
    this.handleUpdateEventSubscription = this.handleUpdateEventSubscription.bind(this);
  }

  test() {
    if (this.currentPath === Router.path) return false;
    this.currentPath = Router.path;

    const { 0: match, groups: params } = this.matchtest.exec(this.currentPath) || {};
    if (this.match === match) return false;
    this.match = match;

    if (match === undefined) this.result = undefined;
    else {
      window.defaultRoute = false;
      this.result = typeof this.output === 'function'
        ? this.output(params)
        : this.output;
    
    }

    return true;
  }

  handleUpdate() {
    if (this.test()) this.forceUpdate();
  }

  subscribeToUpdateEvent() {
    this.updateSub = Router.updateEvent.subscribe(this.handleUpdate);
  }

  unsubscribeFromUpdateEvent() {
    this.updateSub.unsubscribe();
  }

  handleUpdateEventSubscription() {
    this.subscribeToUpdateEvent();
    return this.unsubscribeFromUpdateEvent;
  }
}