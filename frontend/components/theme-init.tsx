"use client"

import { useEffect } from 'react'

function hexToRgb(hex: string) {
  hex = hex.replace('#', '')
  if (hex.length === 3) hex = hex.split('').map(c => c + c).join('')
  const num = parseInt(hex, 16)
  return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 }
}

function rgbToHex(r: number, g: number, b: number) {
  return '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('')
}

function luminance(r: number, g: number, b: number) {
  const a = [r, g, b].map(v => {
    v = v / 255
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
  })
  return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2]
}

function contrastRatio(rgb1: { r: number; g: number; b: number }, rgb2: { r: number; g: number; b: number }) {
  const L1 = luminance(rgb1.r, rgb1.g, rgb1.b)
  const L2 = luminance(rgb2.r, rgb2.g, rgb2.b)
  const light = Math.max(L1, L2)
  const dark = Math.min(L1, L2)
  return (light + 0.05) / (dark + 0.05)
}

function blendWithBlack(rgb: { r: number; g: number; b: number }, t: number) {
  return { r: Math.round(rgb.r * (1 - t)), g: Math.round(rgb.g * (1 - t)), b: Math.round(rgb.b * (1 - t)) }
}

export default function ThemeInit() {
  useEffect(() => {
    try {
      const root = document.documentElement
      // read currently configured primary or fallback
      let primary = getComputedStyle(root).getPropertyValue('--primary').trim() || '#A28089'
      // ensure hex
      if (!primary.startsWith('#')) {
        // try to parse rgb() or oklch - fallback to default
        if (primary.startsWith('rgb')) {
          const m = primary.match(/(\d+),\s*(\d+),\s*(\d+)/)
          if (m) primary = rgbToHex(parseInt(m[1]), parseInt(m[2]), parseInt(m[3]))
        } else {
          primary = '#A28089'
        }
      }

      const white = { r: 255, g: 255, b: 255 }
      let rgb = hexToRgb(primary)
      let cr = contrastRatio(rgb, white)

      // If contrast with white is below 4.5, darken primary until contrast >= 4.5 (or max 60% darken)
      let t = 0
      while (cr < 4.5 && t <= 0.6) {
        t += 0.05
        const darker = blendWithBlack(rgb, t)
        cr = contrastRatio(darker, white)
        if (cr >= 4.5) {
          rgb = darker
          break
        }
      }

      // set CSS variables
      const finalHex = rgbToHex(rgb.r, rgb.g, rgb.b)
      root.style.setProperty('--primary', finalHex)

      // set foreground: prefer white if contrast ok, else dark
      const whiteContrast = contrastRatio(rgb, white)
      if (whiteContrast >= 4.5) {
        root.style.setProperty('--primary-foreground', '#ffffff')
      } else {
        root.style.setProperty('--primary-foreground', '#2E2A2A')
      }

      // compute 10% tint rgba for backgrounds
      root.style.setProperty('--primary-10', `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.10)`)
      root.style.setProperty('--primary-5', `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.05)`)
    } catch (e) {
      // noop on any failure
      console.error('theme init failed', e)
    }
  }, [])

  return null
}
