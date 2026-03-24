export default function Footer() {
  return (
    <footer className="py-8 border-t border-white/10 glass mt-10 relative z-10 rounded-t-[40px]">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center justify-center">
        <p className="text-gray-300 font-medium mb-2 flex items-center gap-2 text-lg">
          Open to work in DevOps field 🚀
        </p>
        <p className="text-gray-500 text-sm">
          © {new Date().getFullYear()} Sachin Sharma. Built with Next.js & Tailwind.
        </p>
      </div>
    </footer>
  );
}
