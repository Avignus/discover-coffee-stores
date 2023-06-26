import "@/styles/globals.css";

import type { AppProps } from "next/app";

import Footer from "@/components/footer.component";
import StoreProvider from "@/store/store-context";
export default function App({ Component, pageProps }: AppProps) {
    return (
        <StoreProvider>
            <Component {...pageProps} />
            {/* <Footer /> */}
        </StoreProvider>
    );
}
