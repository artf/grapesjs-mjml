// Specs: https://mjml.io/documentation/#mjml-section
import { isComponentType } from './index.js';

export default (editor, { dc, coreMjmlModel, coreMjmlView }) => {
  const type = 'mj-section';
  const draggable = [
    'mj-body',
    'mj-wrapper',
  ].map(tag => `[data-gjs-type=${tag}]`).join(', ');

  dc.addType(type, {
    isComponent: isComponentType(type),

    model: {
      ...coreMjmlModel,
      defaults: {
        name: 'Section',
        draggable,
        droppable: '[data-gjs-type=mj-column]',
        'style-default': {
          'padding-top': '10px',
          'padding-bottom': '10px',
          'vertical-align': 'top',
          'text-align': 'center',
        },
        stylable: [
          'vertical-align', 'text-align',
          'padding', 'padding-top', 'padding-left', 'padding-right', 'padding-bottom',
          'background-color', 'background-url', 'background-repeat', 'background-size',
          'border-radius', 'border-top-left-radius', 'border-top-right-radius', 'border-bottom-left-radius', 'border-bottom-right-radius',
          'border', 'border-width', 'border-style', 'border-color'
        ],
      },
    },

    view: {
      ...coreMjmlView,
      tagName: 'div',
      attributes: {
        style: 'pointer-events: all;',
        'data-type': 'mj-section',
      },

      getMjmlTemplate() {
        return {
          start: `<mjml><mj-body>`,
          end: `</mj-body></mjml>`,
        };
      },

      getChildrenSelector() {
        return 'table > tbody > tr > td';
      },

      init() {
        coreMjmlView.init.call(this);
        this.listenTo(this.model.get('components'), 'add remove', this.render);
      },
    },
  });
};
