// imshop-admin/src/plugins/blue.js
import BliButton from '@blibli/blue.button/dist/button/blue/Button'

export default {
  install(app) {
    app.component('BliButton', BliButton)
  }
}