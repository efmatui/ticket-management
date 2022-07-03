<template>
  <div>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" class="px-6 py-3">
            Type
          </th>
          <th scope="col" class="px-6 py-3">
            Price
          </th>
          <th scope="col" class="px-6 py-3">
            Amount_Per_Day
          </th>
          <th scope="col" class="px-6 py-3">
            Minimum_Buy
          </th>
          <th scope="col" class="px-6 py-3">
            Status
          </th>
        </tr>
        </thead>
        <tbody v-for="ticketInformation in this.ticketInformations">
        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
          <th scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
            {{ ticketInformation.type }}
          </th>
          <td class="px-6 py-4">
            {{ ticketInformation.price }}
          </td>
          <td class="px-6 py-4">
            {{ ticketInformation.amountPerDay }}
          </td>
          <td class="px-6 py-4">
            {{ ticketInformation.minimumBuy }}
          </td>
          <td class="px-6 py-4">
            <div class="bg-green-500 text-white font-bold rounded-t px-4 py-2" v-if="ticketInformation.status">
              Ticket Available
            </div>
            <div class="bg-red-500 text-white font-bold rounded-t px-4 py-2" v-else>
              Ticket Unavailable
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>

</template>

<script lang="ts">
import Vue from 'vue'
import DatePicker from 'vue2-datepicker';
import vSelect from 'vue-select'
import 'vue2-datepicker/index.css';
import "vue-select/dist/vue-select.css";
import moment from "moment";

export default Vue.extend({
  components: { DatePicker, vSelect },
  name: 'ReportPage',
  data() {
    return {
      ticketInformations: [],
      startDate: '',
      endDate: '',
      selected: '',
    };
  },
  async created() {
    const response = await fetch('http://localhost:3000/api/ticket')
    this.ticketInformations = await response.json();
  },
  methods: {
    setSelected (value) {
      this.selected = value
    },
    toUTC(date: any){
      return moment(date).utc().toISOString() || ''
    }
  }
})
</script>
