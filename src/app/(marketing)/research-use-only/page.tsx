import { getMarketingPageExports } from "@/lib/createMarketingPage";

const { metadata, Page } = getMarketingPageExports("research-use-only");
export { metadata };
export default Page;
