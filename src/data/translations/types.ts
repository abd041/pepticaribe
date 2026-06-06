export interface TranslationSchema {
  common: {
    brandName: string;
    researchUseOnly: string;
    language: string;
    english: string;
    spanish: string;
    viewDetails: string;
    addToCart: string;
    researchGrade: string;
    backToHome: string;
  };
  gate: {
    badge: string;
    title: string;
    subtitle: string;
    checkboxAge: string;
    checkboxRuo: string;
    checkboxNoHuman: string;
    enterButton: string;
    exitButton: string;
    exitConfirm: string;
    footerDisclaimer: string;
    isoBadge: string;
    secureBadge: string;
    allRequired: string;
  };
  nav: {
    home: string;
    products: string;
    coa: string;
    about: string;
    faq: string;
    contact: string;
    membership: string;
    cart: string;
    menu: string;
    myAccount: string;
    openMenu: string;
    closeMenu: string;
  };
  hero: {
    eyebrow: string;
    headlineResearch: string;
    headlinePeptides: string;
    headlineTrust: string;
    subcopy: string;
    ctaProducts: string;
    ctaCoa: string;
    badgePurityLabel: string;
    badgePuritySub: string;
    badgeShippingLabel: string;
    badgeShippingSub: string;
    badgeVerifiedLabel: string;
    badgeVerifiedSub: string;
  };
  announcements: {
    shipping: string;
    ruo: string;
    secure: string;
    regionLabel: string;
  };
  valueProps: {
    qualityTitle: string;
    qualityDesc: string;
    shippingTitle: string;
    shippingDesc: string;
    testedTitle: string;
    testedDesc: string;
    trustedTitle: string;
    trustedDesc: string;
  };
  featured: {
    eyebrow: string;
    title: string;
    viewAll: string;
    compoundEyebrow: string;
    viewDetails: string;
    addToCart: string;
  };
  coa: {
    eyebrow: string;
    title: string;
    description: string;
    cta: string;
  };
  disclaimer: {
    title: string;
    body: string;
    readFull: string;
  };
  reviews: {
    eyebrow: string;
    title: string;
    showReview: string;
    prevReview: string;
    nextReview: string;
  };
  faq: {
    eyebrow: string;
    title: string;
    viewAll: string;
  };
  footer: {
    columnShop: string;
    columnCompany: string;
    columnSupport: string;
    columnLegal: string;
    linkAllProducts: string;
    linkBestSellers: string;
    linkNewArrivals: string;
    linkAboutUs: string;
    linkOurStory: string;
    linkResearchStandards: string;
    linkShippingInfo: string;
    linkReturns: string;
    linkTrackOrder: string;
    linkPrivacy: string;
    linkTerms: string;
    linkRuo: string;
    barRuo: string;
    copyright: string;
    socialInstagram: string;
    socialX: string;
    socialEmail: string;
  };
  products: {
    catalogEyebrow: string;
    catalogTitle: string;
    catalogDescription: string;
    viewBestSellers: string;
  };
}

/** Dot-notation path into TranslationSchema */
export type TranslationKey = string;

export type Language = "en" | "es";
