import React from 'react';
import { Helmet } from 'react-helmet';

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keyword' content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: 'Welcome To Plantae e-plant Store',
  description: 'We sell Best Indoor & Outdooe plants',
  keywords: 'Floral Plants, Indoor Plants ,Outdoor Plants',
};

export default Meta;
