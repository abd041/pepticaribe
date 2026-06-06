import { getMarketingPageExports } from "@/lib/createMarketingPage";

const { metadata, Page } = getMarketingPageExports("terms-and-conditions");
export { metadata };
export default Page;
