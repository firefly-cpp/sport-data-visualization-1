<template>
    <ul class="nav justify-content-center bg-dark text-white p-2">
      <li class="nav-item">
        <router-link class="nav-link active" to="/" @click="ClearStats()">Dashboard</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link active" to="/realtime" @click="ClearStats(), ShowStats()">Realtime</router-link>
      </li>
       <li class="nav-item" v-if="isRealtime">
        <button class="btn nav-link" @click="RenderStats()">Stats</button>
      </li>
      <li class="nav-item">
        <router-link class="nav-link active" to="/map" @click="ClearStats()">Map</router-link>
      </li>
      <li class="nav-item dropdown">
        <div class="nav-link dropdown-toggle" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">Data</div>
          <ul class="dropdown-menu text-center" aria-labelledby="navbarDropdownMenuLink">
              <li> 
                <!-- Button trigger modal -->
                <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#importDataModal" @click="ClearStats()">
                  Import
                </button>  
              </li>
          </ul>
      </li>
      <li class="nav-item mx-auto">

      </li>
      <li class="nav-item">
        <div class="p-2">Welcome {{getWithExpiry('registerData').name + ' ' + getWithExpiry('registerData').surname + '!'}}</div>
      </li>
      <li class="nav-item p-2">
        <router-link to="/account" @click="ClearStats()"><fa icon="circle-user" class="user-symbol"></fa></router-link>
      </li>
      <div class="nav-item" v-if="GetRegisterStatus.isSigned">
        <button class="btn text-white p-2" @click="Logout(), ClearStats()">Logout</button>
      </div>
    </ul>
</template>

<script>
import { getWithExpiry } from '../../utils/localstorage/localstorage';

export default {
  name: "HeadNav",
  components: {
    
  },
  data() {
    return {
      auth: {
        isRegistered: getWithExpiry('registerData') != null ? true : false,
        isSigned: false,
        rememberMe: getWithExpiry('loginData').remember
      },
      isRealtime: false
    }
  },
  methods: {
    RenderStats() {
      this.$store.dispatch('setSelectedStats', true)
    },
    ClearStats() {
      this.$store.dispatch('setSelectedStats', false)
    },
    getWithExpiry,
    Logout() {
      this.$store.dispatch('setRegisterStatus', this.auth)
    },
    ShowStats() {
      this.isRealtime = true;
    }
  },
  computed: {
    GetRegisterStatus() {
      return this.$store.getters.getRegisterStatus;
    },
    GetSelectedStats() {
      return this.$store.getters.getSelectedStats;
    }
  },
};
</script>

<style scoped>
.user-symbol {
  font-size: 25px;
  color: rgb(233, 229, 173);
}
</style>
