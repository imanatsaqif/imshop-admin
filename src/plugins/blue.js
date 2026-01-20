// imshop-admin/src/plugins/blue.js
import BliButton from "@blibli/blue.button/dist/button/blue/Button";
import BliLoaderGeneral from "@blibli/blue.loader-general/dist/loader-general/blue/LoaderGeneral";
import BliCarouselIndicator from "@blibli/blue.carousel-indicator/dist/carousel-indicator/blue/CarouselIndicator";
import BliSwitch from "@blibli/blue.switch/dist/switch/blue/Switch";

export default {
  install(app) {
    app.component("BliButton", BliButton);
    app.component("BliLoaderGeneral", BliLoaderGeneral);
    app.component("BliCarouselIndicator", BliCarouselIndicator);
    app.component("BliSwitch", BliSwitch);
  },
};
