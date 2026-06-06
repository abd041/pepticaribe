import { getMarketingPageExports } from "@/lib/createMarketingPage";

const { metadata, Page } = getMarketingPageExports("membership");
export { metadata };
export default Page;
