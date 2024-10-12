// Пустой лейаут
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div
        style={{
          backgroundColor: 'var( --primary-background-color)',
          width: '100%',
          height: '60px',
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      ></div>
      {children}
    </>
  );
}
