Vue.use(vuelidate.default);


const pizzaOrBurger = value => value === 'pizza' || value === 'burger' || !validators.helpers.req(value);

const oldEnoughAndAlive = validators.between(12, 120);

new Vue({
    el: '#app',

    data() {
        return {
            form: {
                name: '',
                email: '',
                age: '',
                food: '',
                newsletter: '',
                githubUsername: ''

            }
        }
    },

    validations: {

        form: {
            name: {

                required: validators.required,
                minLength: validators.minLength(5)

            },
            age: {

                required: validators.required,
                integer: validators.integer,
                oldEnoughAndAlive

            },

            email: {
                email: validators.email,
                required: validators.required(function () {
                    return !!this.form.newsletter
                })
            },

            githubUsername: {
                exist(value) {
                    if (!validators.helpers.req(value)) {
                        return true
                    }

                   return axios.get(`//api.github.com/users/${value}`)
                }


            },

            food: {
                pizzaOrBurger
            }



            /*        password: {
                        required: validators.required,
                        minLength: validators.minLength(8)

                    },*/

            /*   repeatPassword: {
                   sameAsPassword: sameAs('password')
               }
*/

        }

    },

    /* computed: {
      /!*   emailIsValid() {
             return !!this.form.email;

         },*!/

         nameIsValid() {
             return !!this.form.name;
         },

         ageIsValid() {
             return typeof this.form.age === 'number' && this.form.age > 12 && this.form.age < 120;
         },

         formIsValid() {
             return this.nameIsValid && this.ageIsValid
         },
     },*/

    methods: {

        shouldAppendValidClass(field) {
            return !field.$invalid && field.$model && field.$dirty
        },

        shouldAppendErrorClass(field) {
            return field.$error
        },


        submitForm() {

            this.$v.form.$touch();


            if (!this.$v.form.$invalid) {
                console.log(`i delivered the message`, this.form)

            } else {
                console.log(`Invalid Form`)

            }

        }
    }

});