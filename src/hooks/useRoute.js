import { useMemo, useEffect } from 'react';
import { useForceUpdate } from '@kemsu/force-update';
import { Location } from '../classes/Location';
import { Route } from '../classes/Route';

export function useRoute(path, output) {

  if (output === undefined && typeof path !== 'string' && !(path instanceof RegExp)) {
    if (Location.handled === true) return;
    return typeof path === 'function'
      ? path()
      : path;
  }

  const forceUpdate = useForceUpdate();
  const route = (() => new Route(forceUpdate, path, output))
  |> useMemo(#, []);

  useEffect(route.handleUpdateEventSubscription, []);

  route.test();
  return route.result;
}
