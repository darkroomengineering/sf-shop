import { create } from 'zustand'

export const useStore = create((set) => ({
  headerData: undefined,
  setHeaderData: (headerData) => set({ headerData }),
  footerData: undefined,
  setFooterData: (footerData) => set({ footerData }),
  navIsOpened: false,
  setNavIsOpened: (value) => set({ navIsOpened: value }),
  triggerTransition: false,
  setTriggerTransition: (triggerTransition) => set({ triggerTransition }),
  toggleCart: undefined,
  setToggleCart: (toggleCart) => set({ toggleCart }),
  contactIsOpen: false,
  setContactIsOpen: (toggle) =>
    set({ contactIsOpen: toggle, overflow: !toggle }),
  selectedProduct: false,
  setSelectedProduct: (value) => set({ selectedProduct: value }),
  galleryVisible: false,
  setGalleryVisible: (value) => set({ galleryVisible: value }),
  showThanks: false,
  setShowThanks: (showThanks) => set({ showThanks }),
}))
