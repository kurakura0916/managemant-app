<template>
    <div>
        <v-container
                fluid
                grid-list-md
                pa-2
        >
            <v-layout wrap>
                <v-flex
                        :cards="cards"
                        v-for="card in cards"
                        :key="card.title"
                >
                    <v-card>
                        <v-card-title v-text="card.title"></v-card-title>
                        <v-divider class="mx-4"></v-divider>
                        <v-card-text>
                            <v-layout align-center>
                                <v-flex xs6 display-3 style="text-align: right">
                                    {{card.num}}
                                </v-flex>
                                <v-flex xs6 style="text-align: left">
                                    <p v-if="card.title === '予約件数'">件</p>
                                    <p v-if="card.title ==='予約人数'">人</p>
                                </v-flex>
                            </v-layout>
                        </v-card-text>
                    </v-card>

                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
export default {
    name: "Card",

    props: {
        cards: {
            type: Array,
            default: null,
            required: true
        }
    }
}
</script>

<style scoped>

</style>
