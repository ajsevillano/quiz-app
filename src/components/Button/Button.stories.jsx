import React from 'react';
import Button from '.';

const componentDescription = `
Buttons are used for triggering actions. There are different types of buttons...

\`\`\`js
import { Button } from 'components/Button'
\`\`\`
`;

//Button component description
export default {
  title: 'Components/Buttons',
  Component: Button,
  parameters: {
    componentSubtitle: 'Initiates an action',
    docs: { description: { component: componentDescription } },
  },
};

const Template = (args) => <Button {...args} />;

//Default variant:purple

export const Purple = Template.bind({});

Purple.args = {
  buttonText: 'Button',
  color: 'purple',
};

//Variant: green

export const Green = Template.bind({});

Green.args = {
  buttonText: 'Play again?',
  color: 'green',
};
Green.parameters = {
  docs: {
    description: {
      story: 'Used for the game over screen.',
    },
  },
};
