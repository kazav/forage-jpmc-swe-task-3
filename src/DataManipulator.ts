import { ServerRespond } from './DataStreamer';

export interface Row {
  price_abc: NumberConstructor,
  price_def: number,
  timestamp: Date,
  ratio: number,
  upper_bound: number,
  lower_bound: number,
  trigger_alert: number | undefined,
}


export class DataManipulator {
  static generateRow(serverResponds: ServerRespond[]) {
    const priceABC = (serverResponds[0].top_ask.price + serverResponds[0].top_bid.price) / 2;
    const priceDEF = (serverResponds[1].top_ask.price + serverResponds[1].top_bid.price) / 2
    const ratio = priceABC / priceDEF;
    const upperBound = 1.07;
    const lowerBound = 0.97; // bounds +/-10%
    const triggerAlert = (ratio > upperBound || ratio < lowerBound) ? ratio : undefined 
    return {
      price_abc: priceABC,
      price_DEF: priceDEF,
      ratio: ratio,
      upper_bound: upperBound,
      lower_bound: lowerBound,
      timestamp: serverResponds[0].timestamp > serverResponds[1].timestamp ?
        serverResponds[0].timestamp : serverResponds[1].timestamp,
      trigger_alert: triggerAlert,
    }
      };
    }
