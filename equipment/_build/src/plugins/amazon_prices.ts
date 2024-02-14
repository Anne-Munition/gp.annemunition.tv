import axios from 'axios';
import streamingPc from '@/equipment/streaming_pc';
import gamingPc from '@/equipment/gaming_pc';
import { ref } from 'vue';

let asins: string[] = [];

for (const key in streamingPc) {
  const item = streamingPc[key as keyof PC];
  if (Array.isArray(item)) {
    item.forEach((x) => asins.push(x.asin));
  } else asins.push(item.asin);
}

for (const key in gamingPc) {
  const item = gamingPc[key as keyof PC];
  if (Array.isArray(item)) {
    item.forEach((x) => asins.push(x.asin));
  } else asins.push(item.asin);
}

asins = [...new Set(asins.filter((x) => x))];

const prices = ref<{ asin: string; price: string }[]>([]);

export async function getPrices() {
  const chunkSize = 10;
  for (let i = 0; i < asins.length; i += chunkSize) {
    const chunk = asins.slice(i, i + chunkSize);
    await axios
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
