import { useMemo, useEffect } from 'react';
import { useForceUpdate } from '@kemsu/force-update';
import { Routing } from '../classes/Routing';

export function useRouting(routes, match) {

  const forceUpdate = useForceUpdate();
  const routing = (() => new Routing(forceUpdate)) |> useMemo(#, []);

  useEffect(routing.handleSubscriptions, []);

  return Routing.Route(
    typeof routes === 'function' ? routes(match) : routes
  );
}
