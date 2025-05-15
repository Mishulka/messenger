trim('  abc  '); // => 'abc'
trim('-_-abc-_-', '_-'); // => 'abc'
trim('\xA0foo'); // "foo"
trim('\xA0foo', ' '); // " foo"
trim('-_-ab c -_-', '_-'); // ab c

['  foo  ', '  bar  '].map(value => trim(value)); // => ['foo', 'bar']

export default function trim(str: string, chars?: string): string {
  const pattern = chars 
    ? new RegExp(`^[${escapeRegExp(chars)}]+|[${escapeRegExp(chars)}]+$`, 'g')
    : /^\s+|\s+$/g;
  
  return str.replace(pattern, '');
}

function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}