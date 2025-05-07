/**
 * Reusable component that i cncludes the SVG path and hex color of the icon from simple icons
 *
 * @param {string} path - The SVG path of the icon
 * @param {string} hex - The hex color of the icon
 * @param {number} size - The size of the icon
 *
 * @returns {JSX.Element} - The SVG icon with the specified path and color
 * @example
 * <SimpleIcon path={siYoutube.path} hex={siYoutube.hex} size={20} />
 *
 */

type Props = {
  icon: { path: string; hex: string }
  size?: number
}

export default function SimpleIcon({ icon, size = 20 }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill={`#${icon.hex}`}
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d={icon.path} />
    </svg>
  )
}
