/**
 * App configuration.
 * This file is used to configure the app settings.
 * Below are the default values.
 */
export default defineAppConfig({
  siteName: 'Aniene',
  shortDescription: 'Aniene è un progetto editoriale ideato nel 2021 dall’artista e curatore Alessandro Dandini de Sylva in collaborazione con il designer Filippo Nostri e dedicato a libri di artisti, curatori e spazi culturali indipendenti presenti a Roma o con un rapporto speciale con la Città.',
  description: `Aniene è un progetto editoriale ideato nel 2021 dall’artista e curatore Alessandro Dandini de Sylva in collaborazione con il designer Filippo Nostri e dedicato a libri di artisti, curatori e spazi culturali indipendenti presenti a Roma o con un rapporto speciale con la Città.`,
  baseUrl: 'https://v3.woonuxt.com',
  siteImage: 'https://user-images.githubusercontent.com/5116925/218879668-f4c1f9fd-bef4-44b0-bc7f-e87d994aa3a1.png',
  storeSettings: {
    autoOpenCart: false,
    showReviews: true,
    showFilters: true,
    showOrderByDropdown: true,
    showSKU: true,
    showRelatedProducts: true,
    showProductCategoriesOnSingleProduct: true,
    showBreadcrumbOnSingleProduct: true,
    showMoveToWishlist: true,
    hideBillingAddressForVirtualProducts: false,
    initStoreOnUserActionToReduceServerLoad: true,
    saleBadge: 'percent', // 'percent', 'onSale' or 'hidden'
  },
});
