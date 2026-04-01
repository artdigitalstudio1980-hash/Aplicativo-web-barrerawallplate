import Image from "next/image";

export default function InventoryPage() {
  return (
    <div className="min-h-screen bg-black text-white pt-32 px-6 pb-20 overflow-hidden relative">
      {/* Fondo Premium */}
      <div className="absolute top-0 left-0 w-full h-full bg-[#030303] -z-10" />
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-white/5 rounded-full blur-[180px] pointer-events-none" />
      
      <div className="max-w-4xl mx-auto">
        <header className="mb-12 border-b border-white/10 pb-8 relative">
          <div className="absolute top-0 left-0 w-8 h-1 bg-white" />
          <h1 className="text-5xl font-light tracking-tighter mb-4 uppercase">
            Internal <span className="font-bold">Inventory</span>
          </h1>
          <p className="text-white/50 text-lg max-w-xl">
            Sincronización de activos para logística interna. Escanea estos códigos directamente 
            desde la Tablet o iPhone para registrar movimientos en bodega.
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Tapa 1-Gang */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-all duration-500 group">
            <h3 className="text-xl font-bold mb-2 uppercase tracking-wide">1-Gang Luxury Wallplate</h3>
            <p className="text-sm text-white/40 mb-8 font-mono">SKU: BW-PLATE-1G</p>
            
            <div className="bg-white rounded-lg p-6 flex items-center justify-center grayscale group-hover:grayscale-0 transition-all duration-700">
               <Image 
                 src="/assets/barcodes/tapa_1_gang.png" 
                 alt="Barcode 1-Gang" 
                 width={300} 
                 height={150}
                 className="object-contain"
               />
            </div>
            <p className="mt-6 text-xs text-center text-white/30 uppercase tracking-[0.2em]">Ready for Internal Scan</p>
          </div>

          {/* Tapa 2-Gang */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-all duration-500 group">
            <h3 className="text-xl font-bold mb-2 uppercase tracking-wide">2-Gang Luxury Wallplate</h3>
            <p className="text-sm text-white/40 mb-8 font-mono">SKU: BW-PLATE-2G</p>
            
            <div className="bg-white rounded-lg p-6 flex items-center justify-center grayscale group-hover:grayscale-0 transition-all duration-700">
               <Image 
                 src="/assets/barcodes/tapa_2_gang.png" 
                 alt="Barcode 2-Gang" 
                 width={300} 
                 height={150}
                 className="object-contain"
               />
            </div>
            <p className="mt-6 text-xs text-center text-white/30 uppercase tracking-[0.2em]">Ready for Internal Scan</p>
          </div>
        </div>

        <section className="mt-20 p-8 border-l-4 border-white bg-white/5 rounded-r-2xl">
          <h4 className="text-lg font-bold mb-2">Tablet & iPhone App Sync</h4>
          <p className="text-white/60 mb-6 leading-relaxed">
            Para descargar el panel de gestión en tu dispositivo móvil, presiona el icono de 
            "Compartir" en Safari o el menú de configuración en Chrome y selecciona 
            <strong> 'Agregar a la pantalla de inicio'</strong>. 
            Tendrás acceso directo a este panel de inventario fuera de línea.
          </p>
          <div className="inline-flex items-center gap-4 text-sm font-bold uppercase tracking-widest bg-white text-black px-6 py-3 cursor-pointer hover:bg-white/90 transition-colors">
            Install Mobile App
          </div>
        </section>
      </div>
    </div>
  );
}
