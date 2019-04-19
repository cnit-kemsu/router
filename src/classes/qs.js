function toString([key, value]) {
  return JSON.stringify(value)
  |> encodeURI
  |> key + '=' + #;
}

function fromString(values, value) {
  return value.split('=')
    |> {
      ...values,
      [#[0]]: decodeURI(#[1]) |> JSON.parse
    };
}

export class QS {

  static stringify(values) {
    return values === undefined ? ''
    : Object.entries(values).map(toString).join('&')
      |> # && '?' + # || '';
  }

  static parse(queryString) {
    return !queryString ? undefined
    : queryString.substr(1).split('&').reduce(fromString, {});
  }

}