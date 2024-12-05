"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";

import { CartItemComponent } from "../components/cart-item";
import { Button } from "../components/button";

import backgroundTexture from "../../../public/images/texture/bg-texture.png";

import { useAuth } from "../hooks/use-auth";
import { getCartItems } from "@/services/firebase/cart/read";
import { emptyCart } from "@/services/firebase/cart/Delete";

import { CartItem } from "../types/cart-item";

import { X, PlusCircle, ShoppingCart } from "@phosphor-icons/react";

export default function Cart() {
  const { currentUser } = useAuth();

  const [cartItems, setCartItems] = useState<CartItem[] | null>(null);
  const [totalPrice, setTotalPrice] = useState<number | null>(null);

  async function handleGetCartItems() {
    const result = await getCartItems(currentUser?.uid!);
    setCartItems(result);
  }

  async function handleEmptyCart() {
    if (currentUser?.uid) {
      const promise = () => {
        return new Promise(async (resolve, reject) => {
          try {
            await emptyCart({ user_id: currentUser.uid! });

            resolve(true);
          } catch (error) {
            console.error(error);

            reject(error);
          }
        });
      };

      toast.promise(promise, {
        pending: "Esvaziando o carrinho",
        success: "Carrinho esvaziado com sucesso",
        error: "Houve um erro ao esvaziar o carrinho",
      });
    }
  }

  useEffect(() => {
    if (currentUser?.uid) {
      handleGetCartItems();
    }
  }, [currentUser]);

  useEffect(() => {
    if (cartItems && cartItems.length > 0) {
      let total = 0;
      for (let i = 0; i < cartItems.length; i++) {
        total += cartItems[i].price;
      }

      setTotalPrice(total);
    }
  }, [cartItems]);

  return (
    <section className="w-full flex flex-col relative px-8 md:px-36 py-28 min-h-screen bg-black">
      <Image
        src={backgroundTexture}
        className="absolute w-full h-full left-0 top-0 z-0 object-cover opacity-40 select-none"
        alt=""
        quality={100}
      />
      <div className="flex flex-col gap-14 z-10">
        <div className="flex flex-row items-center justify-between">
          <h1 className="text-3xl font-bold">Meu carrinho</h1>
          <button
            onClick={handleEmptyCart}
            className="flex items-center gap-1 py-1 px-3 bg-red-600 hover:bg-red-600/70 transition-colors duration-300 rounded-md text-white"
          >
            <X size={20} />
            Esvaziar carrinho
          </button>
        </div>

        <div className="flex flex-col gap-5">
          {cartItems?.map((item) => (
            <CartItemComponent key={item.cart_item_doc_id} item={item} />
          ))}

          {(cartItems?.length === 0 || !cartItems) && (
            <p>Parece que seu carrinho ainda está vázio...</p>
          )}
        </div>

        <div className="flex flex-row justify-between items-center w-full">
          <div className="flex flex-row gap-5">
            <Link href="/catalog">
              <Button
                className="bg-white text-black tracking-wide"
                text="Adicionar Músicas"
                icon={
                  <PlusCircle size={20} className="min-w-[20px] min-h-[20px]" />
                }
              />
            </Link>

            {cartItems && cartItems.length > 0 && (
              <button>
                <Button
                  className="bg-blue-600 text-white tracking-wide"
                  text="Finalizar Compra"
                  icon={
                    <ShoppingCart
                      size={20}
                      weight="fill"
                      className="min-w-[20px] min-h-[20px]"
                    />
                  }
                />
              </button>
            )}
          </div>

          <div>
            <p className="text-xl">Total: {totalPrice || 0} R$</p>
          </div>
        </div>
      </div>
    </section>
  );
}
