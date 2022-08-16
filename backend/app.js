import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors({origin: '*'}));

const fetchWeatherData = (function(){
    const mem = {};
    const query = (city) => {
        const url = new URL("https://api.openweathermap.org/data/2.5/weather");
        const appid = "70f6c5993f1e3cc3cd0e0e8fb9f0f111";
        url.searchParams.append("q", city);
        url.searchParams.append("appid", appid);
        return url.href;
    };
    const getData = async (city) => {
        const url = query(city);
        try {
            const res = await axios.get(url);
            return res.data;
        } catch (error) {
            return "Oops";
        }
    };
    return async (cities) => {
        const out = {};
        for(let city of cities){
            if(city in mem){
                out[city] = mem[city];
            }else{
                const data = await getData(city);
                out[city] = Math.round(data.main.temp - 273.15)+'C';
                if(out[city]=="Oops"){
                    break;
                }
                mem[city] = out[city];
                let memkeys = Object.keys(mem);
                if(memkeys.length > 1000){
                    delete mem[memkeys[0]];
                }
            }
        }
        return {
        	weather: out
        };
    };
})();

app.post("/getWeather", async (req, res) => {
    const data = req.body;
    if(data.cities.length > 0){
        const result = await fetchWeatherData(data.cities);
        res.send(result);
    }else{
        res.send({});
    }
})

app.listen(8000, () => {
    console.log("Server is running @ 8000");
});

