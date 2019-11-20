import React from 'react';
import { QueryRowActions, Props } from './QueryRowActions';
import { shallow } from 'enzyme';
import { LoadingState, DefaultTimeRange } from '@grafana/data';

const setup = (propOverrides?: object) => {
  const props: Props = {
    queryResponse: {
      state: LoadingState.Done,
      series: [],
      timeRange: DefaultTimeRange,
    },
    latency: 0,
    isDisabled: false,
    isNotStarted: true,
    canToggleEditorModes: true,
    onClickToggleEditorMode: () => {},
    onClickToggleDisabled: () => {},
    onClickRemoveButton: () => {},
  };

  Object.assign(props, propOverrides);

  const wrapper = shallow(<QueryRowActions {...props} />);
  return wrapper;
};

describe('QueryRowActions', () => {
  it('should render component', () => {
    const wrapper = setup();
    expect(wrapper).toMatchSnapshot();
  });
  it('should render component without editor mode', () => {
    const wrapper = setup({ canToggleEditorModes: false });
    expect(wrapper.find({ 'aria-label': 'Edit mode button' })).toHaveLength(0);
  });
  it('should change icon to fa-eye-slash when query row result is hidden', () => {
    const wrapper = setup({ isDisabled: true });
    expect(wrapper.find('i.fa-eye-slash')).toHaveLength(1);
  });
  it('should change icon to fa-eye when query row result is not hidden', () => {
    const wrapper = setup({ isDisabled: false });
    expect(wrapper.find('i.fa-eye')).toHaveLength(1);
  });
});
