<template>
<div class="flex flex-col justify-center gap-y-2 h-32 w-32 shadow-md hover:shadow-lg shadow-zinc-900 bg-zinc-800">
    <div class="text-lg text-center break-words">{{weatherdata?.city}}</div>
    <div class="text-md text-center" v-html="temp" />
</div>
</template>
<script>

export default {
    name: "TempCard",
    props: ["weatherdata"],
    methods: {
        map(n, start1, stop1, start2, stop2){
            return ((n-start1)/(stop1-start1))*(stop2-start2)+start2;
        }
    },
    computed:{
        temp(){
            let tmp = this.weatherdata.temp;
            let [unit] = tmp.match(/[a-zA-Z]+/g);
            let temp = parseInt(tmp.replace(unit, ''));
            let hue = temp < 6 ? this.map(temp, 5, -100, 180, 240) : this.map(temp, 6, 100, 60, 0);
            let color = `hsl(${hue}, 60%, 50%)`;
            return `<strong style="color:${color}">${temp}&deg;${unit}</strong>`
        }
    }
}

</script>