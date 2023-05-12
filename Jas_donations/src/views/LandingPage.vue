<template>
  <div class="welcome-box">
    <div class="welcome">
      <h1>Welcome to the Jas Donations Website</h1>
      <h2>Please do well to make a donation</h2>
      <h3>Thank You</h3>

      <div class="buttons">
        <button>
          <router-link to="/register">Register</router-link>
        </button>
        <button>
          <router-link to="/login">Login</router-link>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="css" scoped>
* {
  font-family: candara;
}

.welcome-box {
  background: url("/images/jas_dbanner.png");
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;

}

.welcome {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 20px;
  color: green;
  font-weight: bolder;
  padding: 30px;
  margin-left: -20%;
  width: 40%;
  background-color: rgba(255, 255, 255, 0.749);
  box-shadow: 5px 5px 9px rgb(164, 159, 148),
    -5px -5px 9px rgb(245, 238, 226);


}

.buttons {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 90px;

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

button a {
  text-decoration: none;
  color: white;
}

button:hover {
  background-color: #45a049;
}
</style>