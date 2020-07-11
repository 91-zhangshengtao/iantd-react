import React from 'react';

import { action } from '@storybook/addon-actions';
import { Button } from '@storybook/react/demo';

export default {
  title: 'Button', // 一级story标题
  component: Button,
};

// 二级story的名称
export const Text = () => <Button onClick={action('clicked')}>Hello Button</Button>;
// 二级story的名称
export const Emoji = () => (
  <Button onClick={action('clicked')}>
    <span role="img" aria-label="so cool">
      😀 😎 👍 💯
    </span>
  </Button>
);

Emoji.story = {
  name: 'with emoji',
};
