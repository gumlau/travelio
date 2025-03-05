import { App } from 'vue'

declare global {
  interface Window {
    dataLayer: any[]
    gtag: (...args: any[]) => void
  }
}

export default {
  install: (app: App) => {
    // Insert the gtag script
    const script1 = document.createElement('script')
    script1.async = true
    script1.src = 'https://www.googletagmanager.com/gtag/js?id=G-ZJHFQWY4MZ'
    document.head.appendChild(script1)

    // Initialize gtag
    window.dataLayer = window.dataLayer || []
    function gtag(...args: any[]) {
      window.dataLayer.push(args)
    }
    window.gtag = gtag
    gtag('js', new Date())
    gtag('config', 'G-ZJHFQWY4MZ')

    // Make gtag available in all components
    app.config.globalProperties.$gtag = gtag
  }
} 