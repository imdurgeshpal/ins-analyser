import { ShareMarket } from "../models/share-market";

export const tranformStockDate = (shareMarket: ShareMarket[]): ShareMarket[] => {
    return shareMarket.map(market => {
        const registeredDate = market.registered.slice(0, market.registered.indexOf(' '));
        return {
            ...market,
            registered: registeredDate
        }
    });
}