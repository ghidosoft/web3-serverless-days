import React from 'react';

type Props = React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>;

const ExtAnchor: React.FC<Props> = (props) => (
    <a target="_blank" rel="noreferrer" {...props} />
);

export default ExtAnchor;
