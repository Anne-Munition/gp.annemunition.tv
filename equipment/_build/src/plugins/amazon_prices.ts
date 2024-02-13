import axios from 'axios';
import streamingPc from '@/equipment/streaming_pc';
import { ref } from 'vue';

const asins: string[] = [];

for (const key in streamingPc) {
  const item = streamingPc[key as keyof PC];
  if (Array.isArray(item)) {
    item.forEach((x) => asins.push(x.asin));
  } else asins.push(item.asin);
}

const prices = ref<{ asin: string; price: string }[]>([]);

export function getPrices() {
  const chunkSize = 10;
  for (let i = 0; i < asins.length; i += chunkSize) {
    const chunk = asins.slice(i, i + chunkSize);
    axios
      .post('https://bot.annemunition.tv/asin-price', chunk, {})
      .then(({ data }) => {
        prices.value.push(...data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

export default prices;
