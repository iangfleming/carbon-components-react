import React from 'react';
import { mount, shallow } from 'enzyme';
import NumberInput from '../NumberInput';

describe('numberInput', () => {
  describe('should render as expected', () => {
    const wrapper = mount(
      <NumberInput min={0} max={100} id="test" label="Number Inptut" className="extra-class" />
    );

    const label = wrapper.find('label');
    const numberInput = wrapper.find('input');
    const container = wrapper.find('.bx--number');

    describe('input', () => {
      it('renders a numberInput', () => {
        expect(numberInput.length).toEqual(1);
      });

      it('has the expected classes', () => {
        expect(numberInput.hasClass('bx--number__input')).toEqual(true);
      });

      it('applies extra classes via className', () => {
        expect(container.hasClass('extra-class')).toEqual(true);
      });

      it('should set a min as expected', () => {
        expect(numberInput.props().min).toEqual(0);
        wrapper.setProps({ min: 10 });
        expect(numberInput.props().min).toEqual(10);
      });

      it('should set a max as expected', () => {
        expect(numberInput.props().max).toEqual(100);
        wrapper.setProps({ max: 10 });
        expect(numberInput.props().min).toEqual(10);
      });

      it('should set step as expected', () => {
        expect(numberInput.props().step).toEqual(1);
        wrapper.setProps({ step: 10 });
        expect(numberInput.props().step).toEqual(10);
      });

      it('should set disabled as expected', () => {
        expect(numberInput.props().disabled).toEqual(false);
        wrapper.setProps({ disabled: true });
        expect(numberInput.props().disabled).toEqual(true);
      });
    });

    describe('label', () => {
      it('renders a label', () => {
        expect(label.length).toEqual(1);
      });

      it('has the expected classes', () => {
        expect(label.hasClass('bx--form__label')).toEqual(true);
      });
    });
  });

  describe('events', () => {
    describe('disabled numberInput', () => {
      const onClick = jest.fn();
      const onChange = jest.fn();

      const wrapper = shallow(
        <NumberInput
          id="test"
          onClick={onClick}
          onChange={onChange}
          disabled
        />
      );

      const input = wrapper.find('input');
      const upArrow = wrapper.find('.bx--number__arrow--up');
      const downArrow = wrapper.find('.bx--number__arrow--down');

      it('should not invoke onClick when up arrow is clicked', () => {
        upArrow.simulate('click');
        expect(onClick).not.toBeCalled();
      });

      it('should not invoke onClick when down arrow is clicked', () => {
        downArrow.simulate('click');
        expect(onClick).not.toBeCalled();
      });

      it('should not invoke onChange when numberInput is changed', () => {
        input.simulate('change');
        expect(onChange).not.toBeCalled();
      });
    });

    describe('enabled numberInput', () => {
      const onClick = jest.fn();
      const onChange = jest.fn();

      const wrapper = mount(
        <NumberInput
          id="test"
          onClick={onClick}
          onChange={onChange}
          min={0}
          max={100}
        />
      );

      const input = wrapper.find('input');
      const upArrow = wrapper.find('.bx--number__arrow--up');
      const downArrow = wrapper.find('.bx--number__arrow--down');

      it('should invoke onClick when numberInput is clicked', () => {
        input.simulate('click');
        expect(onClick).toBeCalled();
      });

      it('should invoke onClick when up arrow is clicked', () => {
        upArrow.simulate('click');
        expect(onClick).toBeCalled();
      });

      it('should only increase the value on up arrow click if value is less than max', () => {
        wrapper.setProps({ value: 100 });
        upArrow.simulate('click');
        expect(wrapper.state().value).toEqual(100);
      });

      it('should only decrease the value on down arrow click if value is greater than min', () => {
        wrapper.setProps({ value: 0 });
        downArrow.simulate('click');
        expect(wrapper.state().value).toEqual(0);
      });

      it('should increase by the value of step', () => {
        wrapper.setProps({
          step: 10,
          value: 0,
        });
        expect(wrapper.state().value).toEqual(0);
        upArrow.simulate('click');
        expect(wrapper.state().value).toEqual(10);
      });

      it('should decrease by the value of step', () => {
        wrapper.setProps({
          step: 10,
          value: 100,
        });
        expect(wrapper.state().value).toEqual(100);
        downArrow.simulate('click');
        expect(wrapper.state().value).toEqual(90);
      });

      it('should invoke onClick when down arrow is clicked', () => {
        downArrow.simulate('click');
        expect(onClick).toBeCalled();
      });

      it('should invoke onChange when numberInput is changed', () => {
        input.simulate('change');
        expect(onChange).toBeCalled();
      });
    });
  });
});