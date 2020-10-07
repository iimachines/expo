import { css } from '@emotion/core';
import * as React from 'react';

import { AdditionalProps } from '~/common/headingManager';
import PermalinkIcon from '~/components/icons/Permalink';
import withHeadingManager from '~/components/page-higher-order/withHeadingManager';

type BaseProps = {
  component: any;
  className?: string;
};

type EnhancedProps = {
  children: React.ReactNode;
  nestingLevel?: number;
  additionalProps?: AdditionalProps;
  customIconStyle?: React.CSSProperties;
  id?: string;
};

class Permalink extends React.Component<BaseProps> {
  render() {
    const { component, className, children, ...rest } = this.props;
    return React.cloneElement(
      component,
      {
        className: [className, component.props.className || ''].join(' '),
        ...rest,
      },
      children
    );
  }
}

const STYLES_PERMALINK = css`
  position: relative;
`;

const STYLES_PERMALINK_TARGET = css`
  display: block;
  position: absolute;
  top: -100px;
  visibility: hidden;
`;

const STYLES_PERMALINK_LINK = css`
  text-decoration: inherit;
  color: inherit;

  /*
  When permalink is used inside a collapsible element,
  disable the anchor link and icon to allow the element to collapse when clicked.
  */
  details & {
    pointer-events: none;
  }
`;

const STYLES_PERMALINK_ICON = css`
  cursor: pointer;
  vertical-align: text-top;
  display: inline-block;
  width: 1.2em;
  height: 1.2em;
  padding: 0 0.2em;
  visibility: hidden;

  a:hover & {
    visibility: visible;
  }

  svg {
    width: 100%;
    height: auto;
  }
`;

/**
 * Props:
 * - children: Title or component containing title text
 * - nestingLevel: Sidebar heading level override
 * - additionalProps: Additional properties passed to component
 */
export default withHeadingManager<EnhancedProps>(props => {
  // NOTE(jim): Not the greatest way to generate permalinks.
  // for now I've shortened the length of permalinks.
  const component = props.children as JSX.Element;
  const children = component.props.children || '';

  let permalinkKey = props.id;

  const heading = props.headingManager.addHeading(
    children,
    props.nestingLevel,
    props.additionalProps
  );

  if (!permalinkKey) {
    permalinkKey = heading.slug;
  }

  return (
    <Permalink component={component} data-components-heading>
      <div css={STYLES_PERMALINK} ref={heading.ref}>
        <span css={STYLES_PERMALINK_TARGET} id={permalinkKey} />
        <a css={STYLES_PERMALINK_LINK} href={'#' + permalinkKey}>
          {children}
          <span css={STYLES_PERMALINK_ICON} style={props.customIconStyle}>
            <PermalinkIcon />
          </span>
        </a>
      </div>
    </Permalink>
  );
});
