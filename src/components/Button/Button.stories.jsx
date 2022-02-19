import Button from './index';

export default {
  title: 'Components/Buttons',
  Component: Button,
  parameters: {
    componentSubtitle: 'All the buttons variants',
  },
};

const Template = (args) => <Button {...args} />;

export const Purple = Template.bind({});

export const Red = Template.bind({});

Purple.args = {
  buttonText: 'Button',
  color: 'purple',
};

Red.args = {
  buttonText: 'Button',
  color: 'green',
};
