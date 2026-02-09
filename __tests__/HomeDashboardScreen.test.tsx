/**
 * HomeDashboardScreen tests.
 * Example: mock navigation, wrap render in act(), assert output and navigation calls.
 */

import React, { type ComponentProps } from 'react';
import { Button, Text } from 'react-native';
import TestRenderer from 'react-test-renderer';

import { HomeDashboardScreen } from '@screens/home/HomeDashboardScreen';

type ButtonPressEvent = Parameters<
  NonNullable<ComponentProps<typeof Button>['onPress']>
>[0];

const mockNavigate = jest.fn();

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: mockNavigate }),
}));

describe('HomeDashboardScreen', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('renders title and two buttons', () => {
    let tree: TestRenderer.ReactTestRenderer;
    TestRenderer.act(() => {
      tree = TestRenderer.create(<HomeDashboardScreen />);
    });
    const instance = tree!.root;
    const textNodes = instance.findAllByType(Text);
    const titleText = textNodes.find(
      n => n.props.children === 'Home Dashboard',
    );
    expect(titleText).toBeDefined();
    expect(titleText!.props.children).toBe('Home Dashboard');
    const buttons = instance.findAllByType(Button);
    expect(buttons).toHaveLength(2);
  });

  it('navigates to ExampleForm when first button is pressed', () => {
    let tree: TestRenderer.ReactTestRenderer;
    TestRenderer.act(() => {
      tree = TestRenderer.create(<HomeDashboardScreen />);
    });
    const buttons = tree!.root.findAllByType(Button);
    const firstButtonProps = buttons[0].props as ComponentProps<typeof Button>;
    const event: ButtonPressEvent = {} as ButtonPressEvent;
    TestRenderer.act(() => {
      firstButtonProps.onPress?.(event);
    });
    expect(mockNavigate).toHaveBeenCalledWith('ExampleForm');
  });

  it('navigates to CreateTask when second button is pressed', () => {
    let tree: TestRenderer.ReactTestRenderer;
    TestRenderer.act(() => {
      tree = TestRenderer.create(<HomeDashboardScreen />);
    });
    const buttons = tree!.root.findAllByType(Button);
    const secondButtonProps = buttons[1].props as ComponentProps<typeof Button>;
    const event: ButtonPressEvent = {} as ButtonPressEvent;
    TestRenderer.act(() => {
      secondButtonProps.onPress?.(event);
    });
    expect(mockNavigate).toHaveBeenCalledWith('CreateTask');
  });
});
