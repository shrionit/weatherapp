<template>
    <div class="container px-64 py-2">
        <p class="text-center text-4xl">Weather App</p>
        <div class="py-6 space-x-2">
            <form @submit.prevent="fetchWeatherReport" class="flex flex-row gap-x-1">
                <search-bar class="basis-3/4" v-model="searchtext" />
                <button class="basis-1/4 border-zinc-700 justify-center inline-flex items-center px-4 py-2 text-lg text-white transition ease-in-out duration-150 hover:border-zinc-500 shadow-md hover:shadow-lg hover:shadow-zinc-900 border-2">
                    <template v-if="loading"><Indicator /></template>
                    Search
                </button>
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
import Indicator from './components/Indicator.vue';
import axios from "axios";
export default {
    name: "Frame",  
    components: {SearchBar, TempCard, Indicator},
    data:()=>({
        searchtext: "",
        weatherReport: {},
        loading: false,
    }),
    computed:{
        cities(){
            let out = this.searchtext.replaceAll(' ', '');
            if(out.length>1){
                out = out.split(",");
            }
            return out;
        }
    },
    methods:{
        fetchWeatherReport(){
            if(this.cities.length > 0){
                this.loading = true;
                (async ()=>{
                    const res = await axios.post("http://localhost:8000/getWeather", {
                        cities: this.cities,
                    });
                    if(res.data){
                        this.weatherReport = res.data.weather;
                    }
                    this.loading = false;
                })();
            }
        }
    }
}
</script>