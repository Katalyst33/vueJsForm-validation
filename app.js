Vue.use(vuelidate.default);




new Vue({
    el: '#app',

    data() {
        return {
            form: {
                name: '',
                email:'',
                age:'',
                password:'',
                repeatPassword: '',

            }
        }
    },

    validations:{

            form:{
                name:{

                    required: validators.required,
                    minLength:validators.minLength(5)

                },
                age:{

                    required: validators.required,
                    integer:validators.integer,
                    between: validators.between(12, 120),

                },

                email:{
                    email:validators.email
                },

                password:{
                    required:validators.required,
                    minLength:validators.minLength(8)

                },

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