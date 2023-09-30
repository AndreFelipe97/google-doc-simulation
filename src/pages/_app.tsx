import { LayoutDefault } from '@/components/_layout';
import TitlePageProvider from '@/contexts/PageTitle';
import BreadcrumbsProvider from '@/contexts/breadcrumbs';
import NotificationProvider from '@/contexts/notification';
import { globalStyles } from '@/styles/global';
import type { AppProps } from 'next/app'

globalStyles();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NotificationProvider>
      <BreadcrumbsProvider>
        <TitlePageProvider>
          <LayoutDefault>
            <Component {...pageProps} />
          </LayoutDefault>
        </TitlePageProvider>
      </BreadcrumbsProvider>
    </NotificationProvider>
  )
}
