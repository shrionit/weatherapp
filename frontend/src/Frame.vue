<template>
    <div class="container px-64 py-2">
        <p class="text-center text-4xl">Weather App</p>
        <div class="py-6 space-x-2">
            <form @submit.prevent="fetchWeatherReport" class="flex flex-row gap-x-1">
                <search-bar class="basis-3/4" v-model="searchtext" />
                <button class="basis-1/4 border-gray-600 hover:border-gray-500 hover:shadow-lg hover:shadow-zinc-900 border-2">Search</button>
            </form>
        </div>
        <div class="mt-6">
            <div class="flex h-96 gap-4 p-1 flex-wrap overflow-y-auto">
                <template v-for="([k ,v], i) in Object.entries(weatherReport)">
                    <temp-card :weatherdata="{city:k,temp:v}" />
                </template>
            </div>
        </div>
    </div>
</template>


<script>
import SearchBar from './components/SearchBar.vue';
import TempCard from './components/TempCard.vue';
import axios from "axios";
export default {
    name: "Frame",  
    components: {SearchBar, TempCard},
    data:()=>({
        searchtext: "",
        weatherReport: {}
    }),
    computed:{
        cities(){
            return this.searchtext.split(",");
        }
    },
    methods:{
        fetchWeatherReport(){
            (async ()=>{
                const res = await axios.post("http://localhost:8000/getWeather", {
                    cities: this.cities,
                });
                if(res.data){
                    this.weatherReport = res.data.weather;
                }
            })();
        }
    }
}
</script>