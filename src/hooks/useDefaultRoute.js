import React from 'react';

export function useDefaultRoute(PageNotFound) {
  if (window.defaultRoute === true) return <PageNotFound />;
}