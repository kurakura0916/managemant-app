<template>
    <div class="container">
        <v-form
                v-model="isValid"
                ref="form"
        >
            <h2
                    v-if="success"
                    style="color: green"
            >
                {{successMessages}}
            </h2>
            <v-text-field
                    v-model="email"
                    type="text"
                    label="メールアドレス"
                    required
                    :rules="emailRules"
                    placeholder="例：aaa@domain.com"
                    prepend-icon="person"
                    style="padding: 20px"
            >

            </v-text-field>
            <v-text-field
                    v-model="password"
                    type="password"
                    label="パスワード"
                    required
                    :rules="passwordRules"
                    placeholder="例：××××××××"
                    prepend-icon="lock"
                    style="padding: 20px"
            >

            </v-text-field>
            <Button
                :disabled=!isValid
                :color="color"
                @click="handleClick"
            >
                {{btnText}}
            </Button>
            <p
                    v-if="error"
                    class="login-error"
                    style="padding-top: 20px; color: red"
            >
                {{error}}
            </p>
        </v-form>
    </div>
</template>

<script>
import Button from '@/components/atoms/Button.vue'

const REGEX_EMAIL = /[^\s]@[^\s]/

export default {
    name: 'LoginView',

    components: {
        Button
    },

    props: {
        onlogin: {
            type: Function,
            required: true
        },
        btnText: {
            type: String
        },
        success: {
            type: Boolean,
            default: false
        }
    },

    data () {
        return {
            email: '',
            password: '',
            isValid: false,
            color: 'primary',
            progress: false,
            error: '',
            successMessages: ''
        }
    },

    computed: {
        emailRules () {
            return [
                (value) => {
                if (value.length === 0) {
                    return 'メールアドレスを入力してください'
                }
                if (!REGEX_EMAIL.test(value)) {
                    return '半角の空白が含まれています'
                }
                else { return true }
            }
            ]
        },

        passwordRules () {
            return [
                (value) => {
                if (value.length === 0) {
                    return 'please type your password'
                } else  { return true}
                }
            ]
        }
    },

    methods: {
        handleClick () {
            this.progress = true

            this.onlogin({email: this.email, password: this.password})
                .catch(err => {
                    if (err.message === 'Not Found') {
                        this.error = 'ユーザーが登録されていません。'
                    }
                    if (err.message === 'Unauthorized' ) {
                        this.error = '既に登録されているユーザーです。'
                    }
                })
                .then(() => {
                    this.progress = false
                    this.successMessages = 'ユーザー登録完了'
                })
        }
    }
}
</script>

<style scoped>

</style>
