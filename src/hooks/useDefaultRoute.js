import React from 'react';
import { totalMatches } from '../routing';

export function useDefaultRoute(PageNotFound) {
  if (totalMatches() > 0) return undefined;
  return <PageNotFound />;
}