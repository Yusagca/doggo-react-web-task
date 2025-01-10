// app/layout.tsx
"use client";
import { Provider } from 'react-redux';
import { store } from './store/store'; // Redux Store
import Sidebar from './components/Sidebar';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* Redux Provider ile uygulamayı sarıyoruz */}
        <Provider store={store}>
          <div className="flex">
            <Sidebar /> {/* Sidebar sol tarafta */}
            <main className="flex-grow bg-white">{children}</main>
          </div>
        </Provider>
      </body>
    </html>
  );
}
