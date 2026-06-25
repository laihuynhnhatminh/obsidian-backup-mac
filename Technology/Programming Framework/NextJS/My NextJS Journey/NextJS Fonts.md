<span class="mcl-back-button">[[Technology/Programming Framework/NextJS/My NextJS Journey/index|← My NextJS Journey]]</span> <span class="mcl-back-button">[[Home|🏠 Home]]</span>

---


#nextjs #fonts #react 

## Table of Contents:

- [[#About NextJS Fonts|About NextJS Fonts]]
- [[#Google Fonts|Google Fonts]]
- [[#Local Fonts|Local Fonts]]
	- [[#Local Fonts#Summary|Summary]]
	- [[#Local Fonts#Usage|Usage]]
- [[#Resources|Resources]]

### About NextJS Fonts

- [ ] Summarize nextjs font and how to use them
- [ ] Differences between each of them and how to use
- [ ] Links and resources

### Google Fonts

[NextJS Fonts](https://nextjs.org/docs/app/building-your-application/optimizing/fonts#local-fonts) 

### Local Fonts

#### Summary

```tsx
import localFont from 'next/font/local';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});
const robotoBold = localFont({
  src: './fonts/RobotoBoldVF.woff2',
  variable: '--font-roboto-bold',
  weight: '100 900',
});
const robotoRegular = localFont({
  src: './fonts/RobotoRegularVF.woff',
  variable: '--font-roboto-regular',
  weight: '100 900',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${robotoRegular.className} ${geistSans.variable} ${geistMono.variable} ${robotoBold.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
```

#### Usage

### Resources
[NextJS Fonts](https://nextjs.org/docs/app/building-your-application/optimizing/fonts#local-fonts) 