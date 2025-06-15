import React from 'react'
import { ShoppingCart, X, Plus, Minus, Trash2 } from 'lucide-react'
import { useCartStore } from '../stores/cartStore'
import { Button } from './ui/Button'

export const Cart: React.FC = () => {
  const { 
    items, 
    isOpen, 
    toggleCart, 
    removeItem, 
    updateQuantity, 
    clearCart,
    getTotalItems,
    getTotalPrice 
  } = useCartStore()

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY'
    }).format(price)
  }

  return (
    <>
      {/* Sepet Butonu */}
      <button
        onClick={toggleCart}
        className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors"
      >
        <ShoppingCart className="h-6 w-6" />
        {getTotalItems() > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {getTotalItems()}
          </span>
        )}
      </button>

      {/* Sepet Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={toggleCart} />
          
          {/* Sepet Panel */}
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-lg font-semibold">Sepetim ({getTotalItems()} ürün)</h2>
                <button
                  onClick={toggleCart}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Sepet İçeriği */}
              <div className="flex-1 overflow-y-auto p-4">
                {items.length === 0 ? (
                  <div className="text-center py-8">
                    <ShoppingCart className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Sepetiniz boş</p>
                    <p className="text-sm text-gray-400 mt-2">Ürün eklemek için alışverişe başlayın</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {items.map((item) => (
                      <div key={item.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h3 className="font-medium text-sm">{item.name}</h3>
                          <p className="text-sm text-gray-600">{item.price}</p>
                          
                          {/* Miktar Kontrolü */}
                          <div className="flex items-center space-x-2 mt-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1 hover:bg-gray-100 rounded"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="px-2 py-1 bg-gray-100 rounded text-sm">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1 hover:bg-gray-100 rounded"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                        
                        {/* Silme Butonu */}
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {items.length > 0 && (
                <div className="border-t p-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Toplam:</span>
                    <span className="font-bold text-lg">{formatPrice(getTotalPrice())}</span>
                  </div>
                  
                  <div className="space-y-2">
                    <Button className="w-full" size="lg">
                      Sepeti Onayla
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full" 
                      onClick={clearCart}
                    >
                      Sepeti Temizle
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
} 