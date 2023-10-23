import type { Metadata } from 'next';
import { ReactNode } from 'react';

import 'normalize.css/normalize.css';
import '@/common/styles/main.scss';
import { BaseLayout } from '@/common/layouts/BaseLayout/BaseLayout';

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
