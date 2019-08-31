<template>
    <div class="table-container">
        <v-data-table
                :headers="headers"
                :items="get_filtered_reserve_data"
                class="elevation-1"
        >
            <template v-slot:item.status="{ item }" >
                <v-chip :color="getColor(item.status)"
                        dark
                >
                    <strong>{{item.status}}</strong>
                </v-chip>
            </template>
            <template v-slot:item.store_name="{ item }" >
                <router-link :to="{name: 'CalendarView', params: {id: item.store_id}}">
                    <p style="margin-bottom: 1px">{{item.store_name}}</p>
                </router-link>
            </template>

            <template v-slot:item.action="{ item }">
                <v-icon
                        small
                        @click="editItem(item)"
                        style="padding: 2px"
                >
                    edit
                </v-icon>
                <v-icon
                        small
                        @click="deleteItem(item)"
                        style="padding: 2px"
                >
                    delete
                </v-icon>

                <v-dialog
                    v-model="dialog"
                    max-width="600px"
                >
                    <v-card>
                        <v-card-text>
                            <v-text-field
                                    v-model="editedItem.id"
                                    label="予約番号"
                            >
                            </v-text-field>
                            <v-text-field
                                    v-model="editedItem.name"
                                    label="名前"
                            >
                            </v-text-field>
                            <v-text-field
                                    v-model="editedItem.store_name"
                                    label="店舗名"
                            >
                            </v-text-field>
                            <v-text-field
                                    v-model="editedItem.num"
                                    label="予約人数"
                            >
                            </v-text-field>
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
                                            v-model="editedItem.visit_date"
                                            label="来店日"
                                            readonly
                                            v-on="on"
                                    ></v-text-field>
                                </template>
                                <v-date-picker
                                        v-model="editedItem.visit_date"
                                        label="来店日"
                                >
                                </v-date-picker>
                            </v-menu>
                        </v-card-text>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn text color="blue darken-1" @click="Save">保存</v-btn>
                            <v-btn text color="blue darken-1" @click="Cancel">キャンセル</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>

            </template>
        </v-data-table>
    </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'

export default {
    name: 'Table',

    data () {
        return {
            dialog: false,

            editIndex: -1,

            editedItem: {
                id: '',
                name: '',
                store_name: '',
                num: '',
                visit_date: ''
            },

            defaultItem: {
                id: '',
                name: '',
                store_name: '',
                num: '',
                visit_date: ''
            },

            headers: this.$store.state.reservationsHeaders
        }
    },

    computed: {
        ...mapGetters({get_filtered_reserve_data: 'getFilteredReserveData'})
    },

    created () {
        this.loadReservationLists()
    },

    methods: {

        loadReservationLists () {
            this.$store.dispatch('fetchReservations')
                .catch(err => Promise.reject(err))
                .then()
        },

        ...mapMutations({
            save: 'SAVE_DATA'
        }),

        editItem (item) {
            this.editIndex = this.get_filtered_reserve_data.indexOf(item)
            // 第一引数に無名オブジェクトを指定することで、コピーした内容の新規オブジェクトを作成できる。
            this.editedItem = Object.assign({}, item)

            // dialogをtrueにする前にitemをstate(editItem)に代入する
            this.dialog = true
        },

        deleteItem (item) {
            this.$store.dispatch('deleteReservation', item.id)
                .catch(err => Promise.reject(err))
                .then()
        },

        Save () {
            // saveボタンを押下した時にmysql側にpostする
            this.$store.dispatch('updateReservation', this.editedItem)
                .catch(err => Promise.reject(err))
                .then(() => {
                    this.Cancel()
                })
        },

        Cancel () {
            this.dialog = false
            setTimeout(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editIndex = -1
            }, 300)
        },

        getColor(status) {
            if (status === '確定') return 'green'
            else if (status === 'キャンセル') return 'red'
            else return 'orange'
        }
    }
}
</script>

<style scoped>

</style>
