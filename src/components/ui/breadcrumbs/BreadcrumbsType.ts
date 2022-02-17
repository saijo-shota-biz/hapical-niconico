import { SvgIconComponent } from '@mui/icons-material';

export type BreadcrumbsPosition = 'prev' | 'current' | 'next';

export type BreadcrumbsType = {
  Icon: SvgIconComponent;
  label: string;
  link: string;
  position: BreadcrumbsPosition;
};
