import { Outlet } from "react-router-dom";
import { Footer, Header, MobileNav, ScrollToTop, ScrollToTopIcon, SearchFormPopUp } from "./components";
import { Toaster } from "react-hot-toast";
import { lazy, Suspense, useEffect } from "react";
import { usePopUp } from "./contexts/PopUpContextProvider";

const CategoryImagesSection = lazy(() => import('./components/CategoryImagesSection'));

function App(){
    const { isPopupOpen, closePopup } = usePopUp();
    const isSearchFormPopUpOpen = isPopupOpen('searchForm');
    const isCategoryImagesSectionOpen = isPopupOpen('category');

    useEffect(() => {
    // Wait for Google Translate to load and set initial language
    const checkGoogleTranslate = setInterval(() => {
        if (window.google && window.google.translate) {
            clearInterval(checkGoogleTranslate);
            
            // Check if there's a saved language preference
            const match = document.cookie.match(/googtrans=\/en\/([^;]+)/);
            if (match && match[1] !== 'en') {
                // If a non-English language is saved, trigger translation
                const select = document.querySelector(".goog-te-combo");
                if (select) {
                    select.value = match[1];
                    select.dispatchEvent(new Event("change", { bubbles: true }));
                }
            }
        }
    }, 100);

    return () => clearInterval(checkGoogleTranslate);
}, []);

    return (
        <main className="bg-gray-50">
            <Header />
            <Outlet />
            <Footer />
            <MobileNav />
            <Toaster />
            <ScrollToTop />
            <ScrollToTopIcon />
            {isSearchFormPopUpOpen && <SearchFormPopUp closePopup={closePopup} />}
            {isCategoryImagesSectionOpen && <Suspense><CategoryImagesSection closePopup={closePopup} /></Suspense>}
        </main>
    );
}

export default App;