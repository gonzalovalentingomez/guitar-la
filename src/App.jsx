import { useEffect } from 'react'
import { useState } from 'react'
import './App.css'
import Guitar from './components/Guitar'
import Header from './components/Header'
import { db } from './data/db'

function App() {

  const initialCart = () => {
    const localStorageCart = localStorage.getItem('cart')
    return localStorageCart ? JSON.parse(localStorageCart) : []
  }

  const [data] = useState(db)
  const [cart, setCart] = useState(initialCart)


  //Min-Max Items
  const MIN_ITEMS = 1
  const MAX_ITEMS = 5


  //LocalStorage para guardar el carrito con useEffect
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])


  //Funcion para agregar al carrito
  function addToCart(item) {
    const itemExists = cart.findIndex(guitar => guitar.id === item.id)
    if(itemExists >= 0) {
      if(cart[itemExists].quantity >= MAX_ITEMS) return
      const updateCart = [...cart]
      updateCart[itemExists].quantity++
      setCart(updateCart)
    } else {
      item.quantity = 1
      setCart([...cart, item])
    }
  }

  //Funcion para remover items en el carrito
  function removeFromCart(id) {
    setCart(prevCart => prevCart.filter(guitar => guitar.id !== id))
  }

  //Funcion para decrementar items en el carrito
  function decreaseQuantity(id) {
    const updatedCart = cart.map(item => {
      if(item.id === id && item.quantity > MIN_ITEMS) {
        return {
          ...item,
          quantity: item.quantity - 1
        }
      }
      return item
    })
    setCart(updatedCart)
  }

  //Funcion para incrementar items en el carrito 
  function increaseQuantity(id) {
    const updatedCart = cart.map(item => {
      if(item.id === id && item.quantity < MAX_ITEMS) {
        return {
          ...item,
          quantity: item.quantity + 1
        }
      }
      return item
    })
    setCart(updatedCart)
  }

  //Funcion para limpiar el carrito
  function clearCart() {
    setCart([])
  }



  return (
    <>
      <Header 
        cart={cart}
        removeFromCart={removeFromCart}
        decreaseQuantity={decreaseQuantity}
        increaseQuantity={increaseQuantity}
        clearCart={clearCart}
      />
      <main className="container-xl mt-5">
          <h2 className="text-center">Nuestra Colección</h2>
          <div className="row mt-5">
            {data.map((guitar) => (
              <Guitar
                key={guitar.id}
                guitar={guitar}
                setCart={setCart}
                addToCart={addToCart}
              />
            ))}
          </div>
      </main>


      <footer className="bg-dark mt-5 py-5">
          <div className="container-xl">
              <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
          </div>
      </footer>
    </>
  )
}

export default App
