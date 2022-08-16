<template>
<input type="text" class="px-2 bg-zinc-900 h-12 font-thin" placeholder="City1, City2, ..." ref="cities" v-model="value" @input="updateInput()">
</template>

<script>
export default {
  name: "SearchBar",
  props: ["value"],
  methods:{
    updateInput(){
      this.$emit("input", this.$refs.cities.value);
    }
  },
}
</script>