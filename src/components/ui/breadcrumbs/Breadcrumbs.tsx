import { NavigateNext } from '@mui/icons-material';
import { Breadcrumbs as MuiBreadcrumbs, Link, LinkProps } from '@mui/material';
import { BreadcrumbsType } from '@ui/breadcrumbs/BreadcrumbsType';
import { Label } from '@ui/typography/Label';
import { VFC } from 'react';

type Props = {
  breadcrumbs: BreadcrumbsType[];
};

const endLinkProps: LinkProps = {
  underline: 'none',
  color: 'text.primary',
  sx: { display: 'flex', alignItems: 'center', cursor: 'default' },
};

const notEndLinkProps: LinkProps = {
  underline: 'hover',
  color: 'inherit',
  sx: { display: 'flex', alignItems: 'center' },
};

export const Breadcrumbs: VFC<Props> = ({ breadcrumbs }) => {
  return (
    <MuiBreadcrumbs
      separator={<NavigateNext fontSize="small" />}
      sx={{ padding: 2, backgroundColor: 'grey.100', border: 'solid 1px', borderColor: 'grey.200' }}
    >
      {breadcrumbs.map((e, i) => (
        <Link key={i} {...(breadcrumbs.length - 1 === i ? endLinkProps : notEndLinkProps)} href={e.link}>
          <e.Icon fontSize="inherit" />
          <Label size={'sm'} sx={{ marginLeft: 1 }}>
            {e.label}
          </Label>
        </Link>
      ))}
    </MuiBreadcrumbs>
  );
};
