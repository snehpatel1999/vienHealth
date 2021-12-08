import React, { Fragment, ReactNode} from "react"
import {Helmet} from 'react-helmet'

type HeadMetaProps = {
 children: ReactNode;
 title?: string;
 description?: string;
 keywords?: string;
}

const HeadMeta = ({ title, description, keywords ,children, ...props }: HeadMetaProps) => {
  return (
   <Fragment {...props}>
            <Helmet>
                <title>{title}</title>
                <meta name="description" content = { description } />
                <meta name="keywords" content={keywords} />
            </Helmet>
            {children}
        </Fragment>
  );
};

export default HeadMeta;
