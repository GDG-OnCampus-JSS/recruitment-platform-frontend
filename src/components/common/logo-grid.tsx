export default function LogoGrid({ children }: { children: React.ReactNode }) {
    return (
      <div className="relative grid h-screen place-items-center overflow-hidden bg-logo-grid bg-top bg-no-repeat">
        {/* Background Layer */}
        <div className="bg-register-gradient pointer-events-none absolute inset-0"></div>
  
        {/* Foreground Content */}
        <div className="relative">{children}</div>
      </div>
    );
  }
  