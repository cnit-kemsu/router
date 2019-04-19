import { useMemo, useEffect } from 'react';
import { useForceUpdate } from '@kemsu/force-update';
import { Route } from '../classes/Route';

export function useRoute(path, output) {

  const forceUpdate = useForceUpdate();
  const routing = (() => new Route(forceUpdate, path, output))
  |> useMemo(#, []);

  useEffect(routing.handleUpdateEventSubscription, []);

  return routing.result();
}
