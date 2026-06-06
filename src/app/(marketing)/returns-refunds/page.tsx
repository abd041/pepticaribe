import { getMarketingPageExports } from "@/lib/createMarketingPage";

const { metadata, Page } = getMarketingPageExports("returns-refunds");
export { metadata };
export default Page;
