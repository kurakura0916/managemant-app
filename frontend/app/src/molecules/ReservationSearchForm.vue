<template>
    <div class="container">
        <div class="search">
            <v-text-field
                    solo
                    v-model="query.name"
                    @change="handleChangeQuery"
                    label="名前"
                    placeholder="例：山田 太郎"
                    prepend-icon="person"
                    style="padding: 0 10px"
            >
            </v-text-field>

            <v-select
                    solo
                    v-model="query.store_name"
                    @change="handleChangeQuery"
                    :items="get_store_name"
                    label="店舗名"
                    prepend-icon="home"
                    style="padding: 0 10px"
            >
            </v-select>

            <v-select
                    solo
                    v-model="query.status"
                    @change="handleChangeQuery"
                    :items="this.statusCategory"
                    label="ステータス"
                    prepend-icon="how_to_reg"
                    style="padding: 0 10px"
            >
            </v-select>

            <v-menu
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    full-width
                    min-width="290px"
            >
                <template v-slot:activator="{ on }">
                    <v-text-field
                            v-model="query.visit_date"
                            label="来店日"
                            prepend-icon="event"
                            readonly
                            v-on="on"
                            style="padding: 0 10px"
                    ></v-text-field>
                </template>
                <v-date-picker v-model="query.visit_date" @change="handleChangeQuery"></v-date-picker>
            </v-menu>

        </div>
        <div class="button">
            <Button
                    :disabled="false"
                    :color="color"
                    @click="resetQuery"
            >
                <span>クリア</span>
            </Button>
        </div>
    </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import Button from '@/components/atoms/Button.vue'

export default {
    name: 'ReservationSearchForm',

    components: {
        Button
    },

    data () {
        return {
            query: {
                name: '',
                status: '',
                store_name: '',
                visit_date: ''
            },
            statusCategory: ['確定', 'キャンセル'],
            color: 'grey lighten-1'
        }
    },

    computed: {
        ...mapGetters({
            get_store_name: 'getStoreName'
        })
    },

    mounted () {
      this.set_filter_query(this.query)
    },

    methods: {
        ...mapMutations({
            set_filter_query: 'SET_FILTER_QUERY'
        }),

        handleChangeQuery () {
            this.set_filter_query(this.query)
        },

        resetQuery () {
            this.query.name = ''
            this.query.status = ''
            this.query.store_name = ''
            this.query.visit_date = ''

            this.set_filter_query(this.query)
        }
    }
}
</script>

<style scoped>
 .search {
     width: 100%;
     display: inline-flex;
     padding: 20px;
     height: 100px;
 }
 .button {
     text-align: center;
 }
 .button span{
     color: white;
     font-weight: bold;
 }
</style>
