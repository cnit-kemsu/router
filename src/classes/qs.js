function toString([key, value]) {
  return JSON.stringify(value)
  |> encodeURIComponent
  |> key + '=' + #;
}

function fromString(values, value) {
  return value.split('=')
    |> {
      ...values,
      [#[0]]: decodeURIComponent(#[1]) |> JSON.parse
    };
}

export class QS {

  static stringify(values) {
    return values === undefined ? ''
    : Object.entries(values).map(toString).join('&')
      |> # && '?' + # || '';
  }

  static parse(queryString) {
    return !queryString ? {}
    : queryString.substr(1).split('&').reduce(fromString, {});
  }

}