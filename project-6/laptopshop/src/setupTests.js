// jest-dom adds custom jest matchers for asserting on DOM nodes.
import '@testing-library/jest-dom';

jest.mock('antd', () => {
    const React = require('react');
    return {
        message: {
            success: jest.fn(),
            error: jest.fn(),
            info: jest.fn(),
            warning: jest.fn(),
        },
        Button: ({ children, ...props }) => React.createElement('button', props, children),
        Card: ({ children, ...props }) => React.createElement('div', props, children),
        Input: {
            Search: ({ children, ...props }) => React.createElement('input', props, children),
        },
        Select: Object.assign(
            ({ children, ...props }) => React.createElement('select', props, children),
            { Option: ({ children, ...props }) => React.createElement('option', props, children) }
        ),
        Pagination: ({ children, ...props }) => React.createElement('div', props, children),
        Tag: ({ children, ...props }) => React.createElement('span', props, children),
        Menu: ({ children, ...props }) => React.createElement('div', props, children),
        Avatar: (props) => React.createElement('div', props),
        Badge: ({ children }) => React.createElement('div', null, children),
        Space: ({ children }) => React.createElement('div', null, children),
        Modal: { confirm: jest.fn() },
        Form: ({ children }) => React.createElement('div', null, children),
        Table: ({ children }) => React.createElement('div', null, children),
        Tabs: ({ children }) => React.createElement('div', null, children),
        Statistic: ({ children }) => React.createElement('div', null, children),
        Row: ({ children }) => React.createElement('div', null, children),
        Col: ({ children }) => React.createElement('div', null, children),
        Divider: ({ children }) => React.createElement('div', null, children),
        Empty: ({ children }) => React.createElement('div', null, children),
        Alert: ({ children }) => React.createElement('div', null, children),
    };
});


