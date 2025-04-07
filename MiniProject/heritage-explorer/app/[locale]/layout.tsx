import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { ReactNode } from 'react';
import { getMessages } from '@/lib/messages'; // make sure this points to your actual helper

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ta' }, { locale: 'hi' }];
}

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages(locale);

  if (!messages) {
    notFound();
  }

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      {children}
    </NextIntlClientProvider>
  );
}
