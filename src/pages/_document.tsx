import { Html, Head, Main, NextScript } from "next/document";
import Document from "next/document";
class MyDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head>
                    <link
                        rel="preload"
                        href="/fonts/JoseFinSans-Bold.ttf"
                        as="font"
                        crossOrigin="anonymous"
                    />
                    <link
                        rel="preload"
                        href="/fonts/JoseFinSans-Regular.ttf"
                        as="font"
                        crossOrigin="anonymous"
                    />
                    <link
                        rel="preload"
                        href="/fonts/JoseFinSans-SemiBold.ttf"
                        as="font"
                        crossOrigin="anonymous"
                    />
                    <link
                        rel="preload"
                        href="/fonts/Roboto-Bold.ttf"
                        as="font"
                        crossOrigin="anonymous"
                    />
                    <link
                        rel="preload"
                        href="/fonts/Roboto-Regular.ttf"
                        as="font"
                        crossOrigin="anonymous"
                    />
                    <link
                        rel="preload"
                        href="/fonts/Roboto-SemiBold.ttf"
                        as="font"
                        crossOrigin="anonymous"
                    />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
// export default function Document() {
//   return (
//     <Html lang="en">
//       <Head />
//       <body>
//         <Main />
//         <NextScript />
//       </body>
//     </Html>
//   )
// }

export default MyDocument;
