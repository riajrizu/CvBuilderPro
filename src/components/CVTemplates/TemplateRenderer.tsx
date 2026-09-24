import React from 'react';
import { CVData } from '../../types';
import { ModernTemplate } from './ModernTemplate';
import { ExecutiveTemplate } from './ExecutiveTemplate';
import { CreativeTemplate } from './CreativeTemplate';
import { TechTemplate } from './TechTemplate';
import { MinimalTemplate } from './MinimalTemplate';

interface TemplateRendererProps {
  data: CVData;
}

export const TemplateRenderer: React.FC<TemplateRendererProps> = ({ data }) => {
  switch (data.style.template) {
    case 'executive':
      return <ExecutiveTemplate data={data} />;
    case 'creative':
      return <CreativeTemplate data={data} />;
    case 'tech':
      return <TechTemplate data={data} />;
    case 'minimal':
      return <MinimalTemplate data={data} />;
    case 'modern':
    default:
      return <ModernTemplate data={data} />;
  }
};
