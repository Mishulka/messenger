import Block from './block';
import { describe, it, expect } from '@jest/globals';

describe('Block', () => {
  it('should be created without errors', () => {
    const block = new Block('div');
    expect(block).toBeInstanceOf(Block);
  });

  it('should update props correctly', () => {
  const block = new Block('div', { text: 'Initial' });
  block.setProps({ text: 'Updated' });
  expect(block.props.text).toBe('Updated');
  });

  it('should update props correctly', () => {
    const block = new Block('div', { text: 'Initial' });
    block.setProps({ text: 'Updated' });
    const fragment = block.getContent();
    expect(fragment?.textContent).toBe('Updated');
  });
});