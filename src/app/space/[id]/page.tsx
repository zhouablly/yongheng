import SpaceClient from './client';

export function generateStaticParams() {
  return [{ id: 'demo' }];
}

export function generateMetadata({ params }: { params: { id: string } }) {
  return {
    title: params.id === 'demo' ? '永恒 · Demo Space' : '永恒 · Love Space',
    description: 'A demo love space created with YONGHENG Light Archive.',
  };
}

export default function SpacePage({ params }: { params: { id: string } }) {
  return <SpaceClient id={params.id} />;
}
