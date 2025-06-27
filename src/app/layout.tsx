// src/app/layout.tsx
import './globals.css';
import { ReduxProvider } from '../app/redux/ReduxProvider';

export const metadata = {
  title: 'My App',
  description: 'Blog with Redux Toolkit',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
