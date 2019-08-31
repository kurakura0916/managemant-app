<template>
    <v-btn
            large
            :color="color"
            :disabled="disabled"
            @click="handleClick"
    >
        <slot />
    </v-btn>
</template>

<script>
export default {
    name: 'Button',

    props: {
        disabled: {
            type: Boolean,
            default: false
        },
        color: {
            type: String
        }
    },

    methods: {
        handleClick (ev) {
            this.$emit('click', ev)
        }
    }
}
</script>

<style scoped>

</style>
