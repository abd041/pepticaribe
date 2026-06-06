import { getMarketingPageExports } from "@/lib/createMarketingPage";

const { metadata, Page } = getMarketingPageExports("coa");
export { metadata };
export default Page;
