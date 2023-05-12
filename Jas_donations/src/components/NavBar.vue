<template>
    <div>
        <nav class=" navbar">
            <div class="img-cont">
                <img src="/images/jas_dlogo.png" alt="jaslogo">
                <h1>JAS Donations</h1>
            </div>

            <ul class="nav-links">
                <li><router-link to="/"> Home</router-link></li>
                <li><router-link to="/about"> About</router-link></li>
                <li><router-link to="/donations"> Donations</router-link></li>
                <li><router-link to="/contact"> Contact Us</router-link></li>
            </ul>



        </nav>
    </div>
</template>


<style lang="css" scoped>
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* padding: 10px; */
    background-color: rgb(255, 219, 153);
    /* max-height: 100px; */
    box-shadow: 5px 5px 9px rgb(142, 142, 142);
}

div.img-cont {
    position: relative;
    display: flex;


    /* width: 20%; */
}

.img-cont img {
    width: 10%;
    margin: 2px 10px;
}


.nav-links {
    list-style: none;
    display: flex;
    gap: 5px;
    justify-content: space-around;
    align-items: center;
    width: 40%;
    margin: 0;
}

.nav-links li a {
    text-decoration: none;
    color: green;
    font-size: 18px;
    font-weight: 530;
}
</style>