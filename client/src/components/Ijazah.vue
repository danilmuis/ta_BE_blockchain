<template>
  <div class="container">
    <h1>TA IPFS Blockchain MDM</h1>
    <div class="send-hash">
      <label for="send-hash">Send to blockchain...</label>
      <input type="text" id="send-hash" v-model="data" placeholder="Enter your hash">
      <button v-on:click="sendHash">SEND!!</button>
    </div>
    <hr>
    <p class="error" v-if="error">{{error}}</p>
    <div class="hash-container">
      <div class="hash"
        v-for="(hash,index) in hashes" 
        v-bind:item="hash"
        v-bind:index="index"
        v-bind:key="index"
      >
        <p class="data">{{hash}}</p>
      </div>
    </div>
  </div>  
</template>

<script>
import handler from "../handler";
export default {
  name: 'Hash',
  data() {
    return {
      hashes:'',
      error: '',
      data: ''
    }
  },
  async created(){
    try{
      this.hashes = await handler.tes();
      
    }catch(e){
      this.error = e.message;
    }
  },
  methods:{
    async sendHash(){
      await handler.sendHash(this.data);
      this.hashes = await handler.tes();
      this.data = "";
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
