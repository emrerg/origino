'use client'

export default function Footer() {
  return (
    <footer className="w-full bg-white py-6 px-5 mt-10 border-t">
      <div className="max-w-md mx-auto flex items-center justify-center gap-7">
        {/* Copyright */}
        <div className="text-black text-[14px]">
          © 2025 Origino
        </div>

        {/* Links */}
        <div className="flex items-center gap-8">
          <a href="/" className="text-black text-[14px] hover:opacity-80">
            Cookies
          </a>
          <a href="/" className="text-black text-[14px] hover:opacity-80">
            Privacy
          </a>
          <a href="/" className="text-black text-[14px] hover:opacity-80">
            Terms
          </a>
        </div>
      </div>
    </footer>
  )
} 