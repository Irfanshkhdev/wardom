export default function AdminPageLayout({ children, className = '' }) {
  return <div className={`space-y-6 ${className}`.trim()}>{children}</div>
}
