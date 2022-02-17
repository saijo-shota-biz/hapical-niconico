import { NavigateNext } from '@mui/icons-material';
import { Breadcrumbs as MuiBreadcrumbs, Link, LinkProps } from '@mui/material';
import { BreadcrumbsType } from '@ui/breadcrumbs/BreadcrumbsType';
import { Label } from '@ui/typography/Label';
import { VFC } from 'react';

type Props = {
  breadcrumbs: BreadcrumbsType[];
};

const prevProps: LinkProps = {
  underline: 'hover',
  color: 'grey.800',
  sx: { display: 'flex', alignItems: 'center' },
};

const currentProps: LinkProps = {
  underline: 'none',
  color: 'secondary.900',
  sx: { display: 'flex', alignItems: 'center', cursor: 'default' },
};

const nextProps: LinkProps = {
  underline: 'hover',
  color: 'grey.400',
  sx: { display: 'flex', alignItems: 'center' },
};

export const Breadcrumbs: VFC<Props> = ({ breadcrumbs }) => {
  const getProps = (breadcrumb: BreadcrumbsType) => {
    if (breadcrumb.position === 'prev') {
      return prevProps;
    }
    if (breadcrumb.position === 'next') {
      return nextProps;
    }
    return currentProps;
  };

  return (
    <MuiBreadcrumbs
      separator={<NavigateNext fontSize="small" />}
      sx={{ padding: 2, backgroundColor: 'grey.100', border: 'solid 1px', borderColor: 'grey.200' }}
    >
      {breadcrumbs.map((e, i) => (
        <Link key={i} {...getProps(e)} href={e.link}>
          <e.Icon fontSize="inherit" />
          <Label size={'sm'} sx={{ marginLeft: 1 }}>
            {e.label}
          </Label>
        </Link>
      ))}
    </MuiBreadcrumbs>
  );
};
