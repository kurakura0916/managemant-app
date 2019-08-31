<template>
    <div class="reservation">
        <div class="form">
            <v-card
                    color="#F9F9F9"
            >
                <ReservationSearchForm />
            </v-card>
        </div>
        <Card :cards="cards"></Card>
        <h2>予約一覧</h2>
        <ReservationTable />
    </div>
</template>

<script>
import ReservationTable from '@/components/molecules/ReservationTable.vue'
import ReservationSearchForm from '@/components/molecules/ReservationSearchForm.vue'
import Card from '@/components/atoms/Card.vue'
import { mapGetters } from 'vuex'

export default {
    name: 'ReservationView',

    components: {
        ReservationTable,
        ReservationSearchForm,
        Card
    },

    computed: {
        ...mapGetters({
            cards: 'getReservationNum'
        })
    }
}
</script>

<style scoped>
    .reservation h2{
        font-family: Roboto,sans-serif;
        color: rgba(0,0,0,.54);
        padding-top: 10px;
    }
    .form {
        padding-top: 10px;
        margin-right: 8px;
        margin-left: 8px;
    }
</style>
