import { getMarketingPageExports } from "@/lib/createMarketingPage";

const { metadata, Page } = getMarketingPageExports("account");
export { metadata };
export default Page;
