import moment from 'moment'
import Vue from 'vue'

Vue.mixin({
  methods: {
    tableDateFormat(date: string) {
      return moment(date).format('D MMM Y hh:mm A');
    }
  }
})
