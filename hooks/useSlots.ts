import api from "@/api/api";
import axios from "axios";
import { useEffect, useState } from "react";

interface Slot {
  slotId: string;
  start: number;
  end: number;
  total: number;
  _count: {
    purchases: number
  }
}

interface CardInterface {
  cardId: string;
  cardName: string;
  slots: Slot[];
}

interface SlotResponse {
  success: boolean;
  slots?: CardInterface;
  message?: string;
}

export const useSlots = (cardId: string) => {
  const [cards, setCards] = useState<CardInterface | null>(null);
  const [loading, setLoading] = useState(true); // ✅ Default to `true`
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSlots = async () => {
      try {
        setLoading(true);
        const res = await api.get<SlotResponse>(`/api/slots/fetchslots/${cardId}`);
        const data = res.data;
        setCards(data.slots || null);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          setError(error.response.data.message as string);
        } else {
          setError("Something went wrong");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchSlots();
  }, [cardId]);

  function increasePurchase(cardId: string){
    if(cards?.cardId !== cardId) return
    setCards((prevCards) => {
      if (!prevCards || prevCards.slots.length === 0) return prevCards; // Handle empty state
    
      // Create a copy of the slots array
      const updatedSlots = [...prevCards.slots];
    
      // Increment the purchases count of the first slot (index 0)
      updatedSlots[0] = {
        ...updatedSlots[0],
        _count: {
          purchases: updatedSlots[0]._count.purchases + 1
        }
      };
    
      // Return the updated cards state
      return {
        ...prevCards,
        slots: updatedSlots
      };
    });
    
  }

  return { loading, cards, error, increasePurchase };
};
