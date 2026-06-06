import { getMarketingPageExports } from "@/lib/createMarketingPage";

const { metadata, Page } = getMarketingPageExports("privacy-policy");
export { metadata };
export default Page;
