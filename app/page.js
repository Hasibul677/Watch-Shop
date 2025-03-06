

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]  from-gray-900 to-black text-white">
      {/* Header */}
      <header className="text-2xl sm:text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
        Watch Shop
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center gap-8 text-center">
        <div className="bg-white p-4 rounded-lg shadow-xl max-w-2xl w-full">
          <p className="text-lg sm:text-xl text-black italic max-w-2xl text-center pb-5">
            "Measure time in style. Embrace moments that matter."
          </p>
          <div className="grid grid-cols-2 gap-4 text-black ">
            <div className="border rounded-lg overflow-hidden shadow-md transition-transform transform hover:scale-105">
              <img src="https://tufinawatches.com/cdn/shop/collections/b7ddcd0a6fa50ed7ce6fd50e6755d4c6_1307x.webp?v=1702826296" alt="Watch Name" className="w-full h-40 object-cover" />
              <div className="p-4">
                <h2 className="font-semibold text-lg">Luxury Watch</h2>
                <p className="text-gray-500">$299</p>
              </div>
            </div>
            <div className="border rounded-lg overflow-hidden shadow-md transition-transform transform hover:scale-105">
              <img src="https://5.imimg.com/data5/SELLER/Default/2024/10/456248063/XV/QM/AV/50922610/whatsapp-image-2024-10-04-at-3-02-04-pm-500x500.jpeg" alt="Watch Name" className="w-full h-40 object-cover" />
              <div className="p-4">
                <h2 className="font-semibold text-lg">Classic Timepiece</h2>
                <p className="text-gray-500">$199</p>
              </div>
            </div>
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="text-sm text-gray-400">
        &copy; 2023 Watch Shop. All rights reserved.
      </footer>
    </div>
  );
}
