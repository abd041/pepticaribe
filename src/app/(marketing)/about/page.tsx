import { getMarketingPageExports } from "@/lib/createMarketingPage";

const { metadata, Page } = getMarketingPageExports("about");
export { metadata };
export default Page;
