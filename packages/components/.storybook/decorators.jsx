import { createElement } from 'react';

const Root = props => (
  <div id="story-root" className="js-enabled" {...props} style={{
    backgroundColor: 'white',
    fontFamily: [ 'GDS Transport', 'Roboto', 'Arial', 'sans-serif' ],
    padding: '1em'
  }}>
    {props.children}
  </div>
);

const decorator = storyFn => {
  return createElement(Root, {}, storyFn());
};

export const root = decorator;

export default root;
