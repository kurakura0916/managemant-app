<template>
    <div>
        <FullCalendar
                :plugins="calendarPlugins"
                defaultView="timeGridWeek"
                slot-duration="00:30:00"
                min-time="10:00:00"
                max-time="24:00:00"
                :events="events"
        />
        <p>{{this.events}}</p>
    </div>
</template>

<script>
import FullCalendar from '@fullcalendar/vue'
import timeGridPlugin from '@fullcalendar/timegrid'
import { mapGetters } from 'vuex'

export default {
    name: "CalendarView",

    components: {
        FullCalendar
    },

    data () {
        return {
            calendarPlugins: [ timeGridPlugin ],
            // events: [
            //     {title: 'sample-event1', start: '2019-08-21 12:00:00', end: '2019-08-21 13:00', textColor: 'white'},
            //     {title: 'sample-event2', start: '2019-08-21T14:00', end: '2019-08-21T14:30', textColor: 'white'}
            // ],
            store_id: this.$route.params.id
        }
    },
    computed: {
        ...mapGetters({get_events: 'getEventsById'}),
        events () {
            return this.get_events(this.store_id)
        }
    }
}
</script>

<style scoped>
    @import '~@fullcalendar/core/main.css';
    @import '~@fullcalendar/timegrid/main.css';
</style>
