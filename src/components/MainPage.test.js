import { shallow } from 'enzyme';
import MainPage from './MainPage';

let wrapper;
beforeEach(() => {
  const mockProps = {
    onRequestRobots: jest.fn(),
    robots: [],
    searchField: '',
    isPending: false,
  };
  wrapper = shallow(<MainPage {...mockProps} />);
});

it('renders MainPage without crashing', () => {
  expect(wrapper).toMatchSnapshot();
});

it('filters robots correctly', () => {
  const mockProps = {
    onRequestRobots: jest.fn(),
    robots: [
      {
        id: 3,
        name: 'John',
        email: 'john@gmail.com',
      },
    ],
    searchField: 'john',
    isPending: false,
  };
  const wrapper = shallow(<MainPage {...mockProps} />);
  expect(wrapper.instance().filterRobots()).toEqual([
    {
      id: 3,
      name: 'John',
      email: 'john@gmail.com',
    },
  ]);
});

it('filters robots correctly 2', () => {
  const mockProps = {
    onRequestRobots: jest.fn(),
    robots: [
      {
        id: 3,
        name: 'John',
        email: 'john@gmail.com',
      },
    ],
    searchField: 'a',
    isPending: false,
  };
  const filteredRobots = [];
  const wrapper = shallow(<MainPage {...mockProps} />);
  expect(wrapper.instance().filterRobots()).toEqual(filteredRobots);
});

it('show loading correctly', () => {
  const mockProps = {
    onRequestRobots: jest.fn(),
    robots: [
      {
        id: 3,
        name: 'John',
        email: 'john@gmail.com',
      },
    ],
    searchField: 'a',
    isPending: true,
  };
  const wrapper = shallow(<MainPage {...mockProps} />);
  expect(wrapper.find('h1').text()).toEqual('Loading');
});
