<template>
    <div class="form-container">

        <form @submit.prevent="submitForm">
            <center>
                <h1>Login</h1>
            </center> <br>

            <label for="name">Username:</label>
            <input type="text" id="name" v-model="user_name"><br><br>
            <label for="password">Password:</label>
            <input type="password" id="password" v-model="user_password"><br><br>

            <center> <button type="submit">Submit</button> </center>
        </form>
    </div>
</template>
  
<script>
import axios from 'axios'
export default {
    data() {
        return {
            user_name: '',
            user_password: ''
        }
    },
    methods: {
        submitForm() {
            console.log(this.user_name, this.user_password)
            const newUser = {
                user_name: this.user_name,
                user_password: this.user_password
            }
            axios.post('http://localhost:3006/login', newUser).then(res => {
                console.log(res)
                this.$router.push('/about')
            })
                .catch(err => console.log(err))

        }
    }
}
</script>

<style lang="css" scoped>
.form-container {
    margin-top: 10%;
}

form {
    width: 400px;
    margin: 10px auto;
    padding: 20px;
    background-color: #FFDB99;
    border-radius: 5px;
}

label {
    display: block;
    margin-bottom: 10px;
}

input[type="text"],
input[type="password"] {
    width: 90%;
    padding: 10px;
    margin-bottom: 20px;
    margin-bottom: 20px;
    border: none;
    border-radius: 5px;
    background-color: white;
}

button {
    display: inline-block;
    padding: 10px 20px;
    font-size: 16px;
    font-weight: bold;
    text-transform: uppercase;
    color: #fff;
    background-color: #4CAF50;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
}
</style>