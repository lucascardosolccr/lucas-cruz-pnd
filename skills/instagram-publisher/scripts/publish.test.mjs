// Run with:  node --test skills/instagram-publisher/scripts/publish.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseArgs } from './publish.js';

const argv = (...rest) => ['node', 'publish.js', ...rest];

test('parses images, caption and dry-run flag', () => {
  const args = parseArgs(argv('--images', 'a.jpg, b.jpg', '--caption', 'hello', '--dry-run'));
  assert.deepEqual(args.images, ['a.jpg', 'b.jpg']);
  assert.equal(args.caption, 'hello');
  assert.equal(args.dryRun, true);
});

test('defaults are empty and dry-run is false', () => {
  const args = parseArgs(argv());
  assert.deepEqual(args.images, []);
  assert.equal(args.caption, '');
  assert.equal(args.dryRun, false);
});

test('trims whitespace around comma-separated images', () => {
  const args = parseArgs(argv('--images', '  x.png ,y.png,  z.png'));
  assert.deepEqual(args.images, ['x.png', 'y.png', 'z.png']);
});

test('ignores a trailing flag with no value', () => {
  const args = parseArgs(argv('--caption'));
  assert.equal(args.caption, '');
});
