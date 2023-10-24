import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { BaseLayout } from '@/common/layouts/BaseLayout/BaseLayout';

import 'normalize.css/normalize.css';
import '@/common/styles/main.scss';

export const metadata: Metadata = {
  title: 'Contact-map',
  description: 'Users list',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='en'>
      <body>
        <BaseLayout>{children}</BaseLayout>
      </body>
    </html>
  );
}
