let _totalMatches = 0;

export function increaseMatches() {
  _totalMatches++;
}

export function clearMatches() {
  _totalMatches = 0;
}

export function totalMatches() {
  return _totalMatches;
}