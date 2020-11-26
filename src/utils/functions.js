import { TEMPERATURE_COLD, TEMPERATURE_COLD_VALUE, TEMPERATURE_HOT, TEMPERATURE_HOT_VALUE, TEMPERATURE_WARM, TEMPERATURE_WARM_VALUE } from "./constants";

export const classifyTemperature = (value) => {
    console.log(value < TEMPERATURE_COLD_VALUE);
    if(value < TEMPERATURE_COLD_VALUE){
        console.log(value);
        return {
            description: TEMPERATURE_COLD,
            gradient: "var(--gradient-cold)",
            color: "var(--cold)"
        };
    }
    if(value < TEMPERATURE_HOT_VALUE && value > TEMPERATURE_COLD_VALUE){
        return {
            description: TEMPERATURE_WARM,
            gradient: "var(--gradient-warm)",
            color: "var(--warm)"
        };
    }
    if(value > TEMPERATURE_HOT_VALUE){
        return {
            description: TEMPERATURE_HOT,
            gradient: "var(--gradient-hot)",
            color: "var(--hot)"
        };
    }
    return null;
}