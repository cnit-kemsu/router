import { useMemo, useEffect } from 'react';
import { useForceUpdate } from '@kemsu/force-update';
import { Route } from '../classes/Route';

export function useRoute(path = '/', output) {

  const forceUpdate = useForceUpdate();
  const route = (() => new Route(forceUpdate, path, output))
  |> useMemo(#, []);

  useEffect(route.handleUpdateEventSubscription, []);

  route.test();
  return route.result;
}
